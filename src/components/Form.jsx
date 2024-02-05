import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCity } from '../contexts/CityContext';
import Button from './Button';
import BackButton from './BackButton';
import styles from './css/Form.module.css';
import { useURLPosition } from '../hooks/useURLPosition';
import Message from '../components/Message';
import Spinner from '../components/Spinner';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export function convertToEmoji(countryCode) {
	const codePoints = countryCode
		.toUpperCase()
		.split('')
		.map(char => 127397 + char.charCodeAt());
	return String.fromCodePoint(...codePoints);
}

const GEOCODING_BASE_URL = 'https://api.bigdatacloud.net/data/reverse-geocode-client';

function Form() {
	const navigate = useNavigate();

	const [lat, lng] = useURLPosition();

	const [isLoadingGeocoding, setIsLoadingGeocoding] = useState(false);
	const [geocodingError, setGeocodingError] = useState('');
	const [cityName, setCityName] = useState('');
	const [country, setCountry] = useState('');
	const [emoji, setEmoji] = useState('');
	const [date, setDate] = useState(new Date());
	const [notes, setNotes] = useState('');

	const { createCity, isLoading: isLoadingCreateCity } = useCity();

	useEffect(
		function () {
			async function fetchCityData() {
				try {
					setIsLoadingGeocoding(true);
					setGeocodingError('');

					const res = await fetch(
						`${GEOCODING_BASE_URL}?latitude=${lat}&longitude=${lng}`
					);
					const data = await res.json();

					if (!data.countryCode) throw new Error('That is not a city!');

					setCityName(data.city || data.locality || '');
					setCountry(data.countryName);
					setEmoji(convertToEmoji(data.countryCode));
				} catch (err) {
					setGeocodingError(err.message);
				} finally {
					setIsLoadingGeocoding(false);
				}
			}
			fetchCityData();
		},
		[lat, lng]
	);

	async function handleSubmit(evt) {
		evt.preventDefault();

		if (!cityName || !date) return;

		const newCity = {
			cityName,
			country,
			emoji,
			date,
			notes,
			position: { lat, lng },
		};

		await createCity(newCity);
		navigate('/app');
	}

	if (isLoadingGeocoding) return <Spinner />;
	if (!lat || !lng) return <Message message="Start by clicking somewhere on the map" />;
	if (geocodingError) return <Message message={geocodingError} />;

	return (
		<form
			className={`${styles.form} ${isLoadingCreateCity ? styles.loading : ''}`}
			onSubmit={handleSubmit}
		>
			<div className={styles.row}>
				<label htmlFor="cityName">City name</label>
				<input
					id="cityName"
					onChange={e => setCityName(e.target.value)}
					value={cityName}
				/>
				<span className={styles.flag}>{emoji}</span>
			</div>

			<div className={styles.row}>
				<label htmlFor="date">When did you go to {cityName}?</label>
				<ReactDatePicker
					id="date"
					selected={date}
					onChange={date => setDate(date)}
					dateFormat="dd/MM/yyyy"
				/>
			</div>

			<div className={styles.row}>
				<label htmlFor="notes">Notes about your trip to {cityName}</label>
				<textarea
					id="notes"
					onChange={e => setNotes(e.target.value)}
					value={notes}
				/>
			</div>

			<div className={styles.buttons}>
				<Button type="primary">Add</Button>
				<BackButton />
			</div>
		</form>
	);
}

export default Form;
