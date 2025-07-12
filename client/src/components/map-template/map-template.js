import React, {useEffect} from 'react';
import {Link, useLocation} from 'react-router-dom';
import {MapContainer, TileLayer, Marker, Popup, Icon} from 'react-leaflet';
import {BelgoServiceConsumer} from '../belgo-service-context';
import L from 'leaflet';

import styles from './map-template.m.less';
import iconMarker from '../map/iconMarker.png';

const myIcon = new L.Icon({
    iconUrl: iconMarker,
    iconRetinaUrl: iconMarker,
    popupAnchor:  [-0, -0],
    iconSize: [23, 36],     
});

const MapTemplate = ({center, dataSpots, activeCity, stylesMapContainer, address_detail}) => {
	const zoom = activeCity === 'Antwerp' ? 11 : 12;
	//to preserve query params
	// const { search } = useLocation();
	const dataMap = address_detail != undefined && address_detail != null ? [address_detail] : dataSpots;

	return (
		<BelgoServiceConsumer.Consumer>
			{ (belgoService) => (
				<MapContainer 	center={center} 
								zoom={zoom}
								scrollWheelZoom={false}
								className={stylesMapContainer}
								>
					<TileLayer attribution='&copy; 
						<a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
						url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
					
					
					{
						dataMap?.map(({address, conception, id, imageIntro, price, concept, descriptionShort, slug}) => {
							const position = [address?.lat, address?.lng];
							// console.log('position', position);
							concept = conception?.label ? conception?.label : null;
							// console.log('concept', concept)
							
							return (
								<Marker 	key={id}
											position={position}
											icon={myIcon}
											>
									<Popup className={styles.popup}>
										<Link to={`/real_estate/${slug}/`}>
											<img src={`${belgoService._apiImages}${imageIntro}`} alt="offer image" />
										</Link>
										<p className={styles.price}>
											{price} 
											<span>&#8364;</span>
										</p>
										<div className={styles.description}>
											<p>{concept}</p>
											<p>{descriptionShort}</p>
										</div>
										
									</Popup>
								</Marker>
							);
						})
					}
				</MapContainer>
			)}
		</BelgoServiceConsumer.Consumer>
	);
};

export default MapTemplate;