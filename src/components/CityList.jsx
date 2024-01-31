import styles from './css/CityList.module.css';
import Spinner from '../components/Spinner';
import CityItem from '../components/CityItem';
import Message from '../components/Message';

function CityList({ cities, isLoading }) {
	if (isLoading) return <Spinner />;
	if (!cities.length) return <Message message="Add a city by clicking on the map" />;

	return (
		<ul className={styles.cityList}>
			{cities.map(city => (
				<CityItem city={city} key={city.id} />
			))}
		</ul>
	);
}
export default CityList;
