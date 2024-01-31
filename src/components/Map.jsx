import { useNavigate, useSearchParams } from 'react-router-dom';
import styles from './css/Map.module.css';

function Map() {
	// Programmatic navigation using useNavigate
	// generally used for navigation on submitting <form>s
	const navigate = useNavigate();

	const [searchParams, setSearchParams] = useSearchParams();
	const lat = searchParams.get('lat');
	const lng = searchParams.get('lng');

	return (
		<div className={styles.mapContainer} onClick={() => navigate('form')}>
			<h1>Map</h1>
			<h2>
				{lat} {lng}
			</h2>
		</div>
	);
}
export default Map;
