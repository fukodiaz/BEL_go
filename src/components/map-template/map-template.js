import React from 'react';
import {MapContainer, TileLayer, Marker, Popup} from 'react-leaflet';

const MapTemplate = ({center, dataSpots, styles}) => {

	return (
		<MapContainer center={center} 
							zoom={12}
							scrollWheelZoom={false}
							className={styles}>
								
			<TileLayer attribution='&copy; 
				<a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
			
			{
				dataSpots.map(({lat,lng, id}) => {
					const position = [lat, lng];
					
					return (
						<Marker 	key={id}
									position={position}>
							<Popup>
								!!!!fff
							</Popup>
						</Marker>
					);
				})
			}
		</MapContainer>
	);
};

export default MapTemplate;