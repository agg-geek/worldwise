import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
	MapContainer,
	TileLayer,
	Marker,
	Popup,
	useMap,
	useMapEvent,
} from 'react-leaflet';
import { useGeolocation } from '../hooks/useGeolocation';
import { useURLPosition } from '../hooks/useURLPosition';
import { useCity } from '../contexts/CityContext';
import styles from './css/Map.module.css';
import Button from '../components/Button';

function CenterMap({ position }) {
	const map = useMap();
	map.setView(position);
	return null;
}

// open the form in the sidebar when the map is clicked
// pass the location of the click to the form component
// so that the form component can read it (so use URL for global state)
function DetectMapClick() {
	const navigate = useNavigate();

	useMapEvent({
		click: e => {
			// console.log(e);
			navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
		},
	});
}

function Map() {
	const { cities } = useCity();

	const [lat, lng] = useURLPosition();
	const [mapPosition, setMapPosition] = useState([lat ?? 39, lng ?? -9]);

	const {
		isLoading: isLoadingPosition,
		position: geolocationPosition,
		getPosition,
	} = useGeolocation();

	useEffect(
		function () {
			if (geolocationPosition)
				setMapPosition([geolocationPosition.lat, geolocationPosition.lng]);
		},
		[geolocationPosition]
	);

	useEffect(
		function () {
			if (lat && lng) setMapPosition([lat, lng]);
		},
		[lat, lng]
	);

	return (
		<div className={styles.mapContainer}>
			{!geolocationPosition && (
				<Button type="position" onClick={getPosition}>
					{isLoadingPosition ? 'Loading...' : 'Use your position'}
				</Button>
			)}
			<MapContainer
				center={mapPosition}
				zoom={8}
				scrollWheelZoom={true}
				className={styles.map}
			>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>

				{cities.map(city => (
					<Marker
						position={[city.position.lat, city.position.lng]}
						key={city.id}
					>
						<Popup>
							{city.emoji} {city.cityName}
						</Popup>
					</Marker>
				))}

				<CenterMap position={mapPosition} />
				<DetectMapClick />
			</MapContainer>
		</div>
	);
}
export default Map;
