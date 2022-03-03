import React, {useEffect, useState} from 'react';

import Map from '../map';
import styles from './map-main-page.m.less';

const MapMainPage = () => {
	
	const [flag, setFlag] = useState(false);

	useEffect(() => {
		const header = document.querySelector('header');
		const heightHeader = window.getComputedStyle(header).height.replace(/[^\d.]/ig, '');
		//const marginHeader = window.getComputedStyle(header).marginBottom.replace(/[^\d.]/ig, '');
		const mapContainer = document.querySelector('[class^="mapContainer"]');
		
		const onScroll = () => {
			if (window.pageYOffset > +heightHeader) {
				setFlag((flag) => flag = true);
				if (flag) {
					mapContainer.style.top = `${window.pageYOffset - +heightHeader}px`;
				}
			} else {
				setFlag((flag) => flag = false);
				mapContainer.style.top = 0;
			}
		};

		window.addEventListener('scroll', onScroll);
		return () => window.removeEventListener('scroll', onScroll);
	}, [flag]);

	return <Map stylesMapContainer={styles.mapContainer} />
};

export default MapMainPage;