import { createContext, useContext, useEffect, useState } from 'react';

const BASE_URL = 'http://localhost:8000';

const CityContext = createContext();

function CityProvider({ children }) {
	const [cities, setCities] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [currCity, setCurrCity] = useState({});

	useEffect(function () {
		async function fetchCities() {
			try {
				setIsLoading(true);
				const res = await fetch(`${BASE_URL}/cities`);
				const data = await res.json();
				setCities(data);
			} catch (err) {
				alert('There was an error loading data');
				console.log(err);
			} finally {
				setIsLoading(false);
			}
		}

		fetchCities();
	}, []);

	async function getCurrCity(cityId) {
		try {
			setIsLoading(true);
			const res = await fetch(`${BASE_URL}/cities/${cityId}`);
			const data = await res.json();
			setCurrCity(data);
		} catch (err) {
			alert('There was an error loading data');
			console.log(err);
		} finally {
			setIsLoading(false);
		}
	}

	return (
		<CityContext.Provider
			value={{
				cities,
				isLoading,
				currCity,
				getCurrCity,
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
