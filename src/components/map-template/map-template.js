import React, {useEffect} from 'react';
import {Link} from 'react-router-dom';
import {MapContainer, TileLayer, Marker, Popup} from 'react-leaflet';

import styles from './map-template.m.less';

const MapTemplate = ({center, dataSpots}) => {

	useEffect(() => {
		const header = document.querySelector('header');
		const heightHeader = window.getComputedStyle(header).height.replace(/[^\d.]/ig, '');
		//const marginHeader = window.getComputedStyle(header).marginBottom.replace(/[^\d.]/ig, '');
		const mapContainer = document.querySelector('[class^="mapContainer"]');
		
		const onScroll = () => {
			if (window.pageYOffset > +heightHeader) {
				mapContainer.style.top = `${window.pageYOffset - +heightHeader}px`;
			} else {
				mapContainer.style.top = 0;
			}
		};

		window.addEventListener('scroll', onScroll);
		return () => window.removeEventListener('scroll', onScroll);
	});
	
	return (
		<MapContainer center={center} 
							zoom={12}
							scrollWheelZoom={false}
							className={styles.mapContainer}>
						
			<TileLayer attribution='&copy; 
				<a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
			
			{
				dataSpots.map(({lat, lng, id, imageIntro, price, concept, descriptionShort}) => {
					const position = [lat, lng];
					
					return (
						<Marker 	key={id}
									position={position}>
							<Popup className={styles.popup}>
								<Link to={id}>
									<img src={imageIntro} alt="offer image" />
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
	);
};

export default MapTemplate;