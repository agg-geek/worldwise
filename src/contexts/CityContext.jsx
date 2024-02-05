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

	async function createCity(city) {
		try {
			setIsLoading(true);
			// we send a POST request to our fake API, json-server will create
			// the city for us, and it will also add an id by default
			// the new city will be automatically added to the cities.json file
			const res = await fetch(`${BASE_URL}/cities`, {
				method: 'POST',
				body: JSON.stringify(city),
				headers: {
					'Content-type': 'application/json',
				},
			});

			const data = await res.json();
			// json-server will add the new city to the cities.json "db"
			// however, react will still use the old state,
			// so we need to manually add the city
			// this is bad, but we will use react-query to fix this later
			setCities(cities => [...cities, data]);
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
				createCity,
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
