import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { useCity } from '../contexts/CityContext';
import styles from './css/Map.module.css';

function CenterMap({ position }) {
	const map = useMap();
	map.setView(position);
	return null;
}

function Map() {
	const navigate = useNavigate();
	const { cities } = useCity();

	const [searchParams] = useSearchParams();
	const lat = searchParams.get('lat');
	const lng = searchParams.get('lng');

	const [mapPosition, setMapPosition] = useState([lat ?? 39, lng ?? -9]);

	// whenever we opened a city, map moved to that location
	// but when we closed that city, the map again moved to the default location
	// hence we now change the location only if a new city is opened
	// otherwise we don't modify anything
	useEffect(
		function () {
			if (lat && lng) setMapPosition([lat, lng]);
		},
		[lat, lng]
	);

	return (
		<div className={styles.mapContainer}>
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
