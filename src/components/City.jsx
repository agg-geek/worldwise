import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styles from './css/City.module.css';
import { useCity } from '../contexts/CityContext';

const formatDate = date =>
	new Intl.DateTimeFormat('en', {
		day: 'numeric',
		month: 'long',
		year: 'numeric',
		weekday: 'long',
	}).format(new Date(date));

function City() {
	const { cityId } = useParams();

	// we require the city data for cityId from API
	// however, this city state is not local to this component
	// we will also use it in the CityList component to mark the
	// currently active city after you close the city details
	// hence, instead of defining the state here, we make it global
	// and hence end up using the CityContext

	const { currCity, getCurrCity } = useCity();

	useEffect(
		function () {
			getCurrCity(cityId);
		},
		// we also need getCurrCity function as the dependency
		// but we cannot add it, will be explained later
		[cityId]
	);

	const { cityName, emoji, date, notes } = currCity;

	return (
		<div className={styles.city}>
			<div className={styles.row}>
				<h6>City name</h6>
				<h3>
					<span>{emoji}</span> {cityName}
				</h3>
			</div>

			<div className={styles.row}>
				<h6>You went to {cityName} on</h6>
				<p>{formatDate(date || null)}</p>
			</div>

			{notes && (
				<div className={styles.row}>
					<h6>Your notes</h6>
					<p>{notes}</p>
				</div>
			)}

			<div className={styles.row}>
				<h6>Learn more</h6>
				<a
					href={`https://en.wikipedia.org/wiki/${cityName}`}
					target="_blank"
					rel="noreferrer"
				>
					Check out {cityName} on Wikipedia &rarr;
				</a>
			</div>
		</div>
	);
}

export default City;
