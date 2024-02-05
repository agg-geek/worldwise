import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { useGeolocation } from '../hooks/useGeolocation';
import { useCity } from '../contexts/CityContext';
import styles from './css/Map.module.css';
import Button from '../components/Button';

function CenterMap({ position }) {
	const map = useMap();
	map.setView(position);
	return null;
}

function Map() {
	const { cities } = useCity();

	const [searchParams] = useSearchParams();
	const lat = searchParams.get('lat');
	const lng = searchParams.get('lng');

	const [mapPosition, setMapPosition] = useState([lat ?? 39, lng ?? -9]);

	const {
		isLoading: isLoadingPosition,
		position: geolocationPosition,
		getPosition,
	} = useGeolocation();

	// on clicking 'Use your position' button, we fetch the user's location
	// via geolocation, and then we synchronize the current position with
	// the map position
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
			</MapContainer>
		</div>
	);
}
export default Map;
