import { createContext, useContext, useEffect, useReducer } from 'react';

const BASE_URL = 'http://localhost:8000';

const CityContext = createContext();

const initialState = {
	cities: [],
	isLoading: false,
	currCity: {},
	error: '',
};

function reducer(state, action) {
	switch (action.type) {
		case 'loading':
			return { ...state, isLoading: true };
		case 'cities/loaded':
			return { ...state, isLoading: false, cities: action.payload };
		case 'city/loaded':
			return { ...state, isLoading: false, currCity: action.payload };
		case 'city/created':
			return {
				...state,
				isLoading: false,
				cities: [...state.cities, action.payload],
				currCity: action.payload,
			};
		case 'city/deleted':
			return {
				...state,
				isLoading: false,
				cities: state.cities.filter(city => city.id !== action.payload),
				currCity: {},
			};
		case 'rejected':
			return { ...state, isLoading: false, error: action.payload };

		default:
			throw new Error('Unknown action type');
	}
}

function CityProvider({ children }) {
	const [{ cities, isLoading, currCity, error }, dispatch] = useReducer(
		reducer,
		initialState
	);

	useEffect(function () {
		async function fetchCities() {
			try {
				dispatch({ type: 'loading' });
				const res = await fetch(`${BASE_URL}/cities`);
				const data = await res.json();
				dispatch({ type: 'cities/loaded', payload: data });
			} catch (err) {
				dispatch({
					type: 'rejected',
					payload: 'There was an error loading cities',
				});
				alert('There was an error loading cities');
				console.log(err);
			}
		}

		fetchCities();
	}, []);

	async function getCurrCity(cityId) {
		if (Number(cityId) === currCity.id) return;

		try {
			dispatch({ type: 'loading' });
			const res = await fetch(`${BASE_URL}/cities/${cityId}`);
			const data = await res.json();
			dispatch({ type: 'city/loaded', payload: data });
		} catch (err) {
			dispatch({
				type: 'rejected',
				payload: 'There was an error loading the city',
			});
			alert('There was an error loading data');
			console.log(err);
		}
	}

	async function createCity(city) {
		try {
			dispatch({ type: 'loading' });
			const res = await fetch(`${BASE_URL}/cities`, {
				method: 'POST',
				body: JSON.stringify(city),
				headers: {
					'Content-type': 'application/json',
				},
			});

			const data = await res.json();
			dispatch({ type: 'city/created', payload: data });
		} catch (err) {
			dispatch({
				type: 'rejected',
				payload: 'There was an error creating the city',
			});
			alert('There was an error creating city');
			console.log(err);
		}
	}

	async function deleteCity(cityId) {
		try {
			dispatch({ type: 'loading' });
			await fetch(`${BASE_URL}/cities/${cityId}`, {
				method: 'DELETE',
			});

			dispatch({ type: 'city/deleted', payload: cityId });
		} catch (err) {
			dispatch({
				type: 'rejected',
				payload: 'There was an error deleting the city',
			});
			alert('There was an error deleting the city');
			console.log(err);
		}
	}

	return (
		<CityContext.Provider
			value={{
				cities,
				isLoading,
				currCity,
				error,
				getCurrCity,
				createCity,
				deleteCity,
			}}
		>
			{children}
		</CityContext.Provider>
	);
}

function useCity() {
	const values = useContext(CityContext);
	if (!values) throw new Error('Context is used outside the Provider');
	return values;
}

export { CityProvider, useCity };
