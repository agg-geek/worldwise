import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styles from './css/City.module.css';
import { useCity } from '../contexts/CityContext';
import Spinner from './Spinner';

const formatDate = date =>
	new Intl.DateTimeFormat('en', {
		day: 'numeric',
		month: 'long',
		year: 'numeric',
		weekday: 'long',
	}).format(new Date(date));

function City() {
	const { cityId } = useParams();
	const { currCity, getCurrCity, isLoading } = useCity();

	useEffect(
		function () {
			getCurrCity(cityId);
		},
		[cityId]
	);

	// when we click on a different city after we've already viewed a previous city
	// then meanwhile the previous city data is still displayed while new city data is fetched
	// hence, show the spinner while you're loading the data
	// also, this early return can only come after useEffect above, due to rules of hooks
	if (isLoading) return <Spinner />;

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
