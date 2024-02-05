import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { useCity } from '../contexts/CityContext';
import styles from './css/Map.module.css';

// see explanation above searchParams first
// every change in react leaflet occurs via components
function CenterMap({ position }) {
	const map = useMap();
	map.setView(position);
	return null; // you need to return JSX, so just return null here
}

function Map() {
	const navigate = useNavigate();
	const { cities } = useCity();

	// you use the lat and lng from the URL query to go to a particular position
	// however, when you are browsing a city and you change it,
	// then the map doesn't change its position, so you need to make leaflet change it
	const [searchParams, setSearchParams] = useSearchParams();
	const lat = searchParams.get('lat') ?? 39;
	const lng = searchParams.get('lng') ?? -9;

	// const [mapPosition, setMapPosition] = useState([39, -9]);

	return (
		<div className={styles.mapContainer}>
			<MapContainer
				// center={mapPosition}
				center={[lat, lng]}
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

				<CenterMap position={[lat, lng]} />
			</MapContainer>
		</div>
	);
}
export default Map;
