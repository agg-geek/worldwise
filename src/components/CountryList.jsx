import styles from './css/CountryList.module.css';
import Spinner from './Spinner';
import CountryItem from './CountryItem';
import Message from './Message';
import { useCity } from '../contexts/CityContext';

function CountryList() {
	const { cities, isLoading } = useCity();

	if (isLoading) return <Spinner />;
	if (!cities.length) return <Message message="Add a city by clicking on the map" />;

	const countries = [
		...new Set(cities.map(({ country, emoji }) => ({ country, emoji }))),
	];

	return (
		<ul className={styles.countryList}>
			{countries.map(country => (
				<CountryItem country={country} />
			))}
		</ul>
	);
}
export default CountryList;
