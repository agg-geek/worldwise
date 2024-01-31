import { createContext, useContext, useEffect, useState } from 'react';

const BASE_URL = 'http://localhost:8000';

const CityContext = createContext();

function CityProvider({ children }) {
	const [cities, setCities] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

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

	return (
		<CityContext.Provider
			value={{
				cities,
				isLoading,
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
