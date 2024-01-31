import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useCity } from '../contexts/CityContext';
import styles from './css/Map.module.css';

function Map() {
	const navigate = useNavigate();
	const { cities } = useCity();

	const [searchParams, setSearchParams] = useSearchParams();
	const lat = searchParams.get('lat');
	const lng = searchParams.get('lng');

	const [mapPosition, setMapPosition] = useState([39, -9]);

	return (
		<div className={styles.mapContainer}>
			<MapContainer
				center={mapPosition}
				zoom={13}
				scrollWheelZoom={true}
				// set the styles.map property to make height: 100%
				className={styles.map}
			>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>

				{/* Render a marker and popup on map for all cities */}
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
			</MapContainer>
		</div>
	);
}
export default Map;
