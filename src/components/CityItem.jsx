import { Link } from 'react-router-dom';
import styles from './css/CityItem.module.css';
import { useCity } from '../contexts/CityContext';

const formatDate = date =>
	new Intl.DateTimeFormat('en', {
		day: 'numeric',
		month: 'long',
		year: 'numeric',
		weekday: 'long',
	}).format(new Date(date));

function CityItem({ city }) {
	const {
		cityName,
		emoji,
		date,
		id: cityId,
		position: { lat, lng },
	} = city;

	const { currCity, deleteCity } = useCity();

	// adding functionality to remove city when cancel btn is clicked
	function handleClick(evt) {
		// Clicking on the cancel btn will also cause the city to open due to the Link
		// hence, preventDefault
		evt.preventDefault();
		deleteCity(cityId);
	}

	return (
		<li>
			<Link
				className={`${styles.cityItem} ${
					cityId === currCity.id ? styles['cityItem--active'] : ''
				}`}
				to={`${cityId}?lat=${lat}&lng=${lng}`}
			>
				<span className={styles.emoji}>{emoji}</span>
				<h3 className={styles.name}>{cityName}</h3>
				<time className={styles.date}>{formatDate(date)}</time>

				<button className={styles.deleteBtn} onClick={handleClick}>
					&times;
				</button>
			</Link>
		</li>
	);
}
export default CityItem;
