import React, {useState, useEffect, useRef} from 'react';

import ListItems from '../list-items';
import FilterCategory from '../filter-category';
import InnerHeading from '../inner-heading';
import MapMainPage from '../map-main-page';

import styles from './main-page.m.less';

const MainPage = () => {
	// const mapInnerBox = useRef(null);
	// const mapWrapper = useRef(null);
	// const wrapper = document.querySelector('#wrapper');
	// const [sizeScrolled, setSizeScrolled] = useState(0);
	// const [offsetMap, setOffsetMap] = useState(0);
	// const [flag, setFlag] = useState(false);
	// function countOffset(el) {
	// 	const rect = el.getBoundingClientRect();
	// 	//const scrollTop = document.body.scrollTop; window.pageYOffset
	// 	const offsetEl =  rect.top + window.pageYOffset;
	// 	return offsetEl;
	// }


	// useEffect(() => {

	// 	const onScroll = (e) => {
	// 		const scrolled = window.scrollY;
	// 		setOffsetMap(countOffset(mapInnerBox.current));
	// 		//const offsetMap = countOffset(mapInnerBox.current);
	// 		console.log(offsetMap, 'offsetMap');
	// 		console.log(scrolled, 77, offsetMap);
	// 		if (scrolled > offsetMap) {
	// 			setOffsetMap(countOffset(mapInnerBox.current));
	// 			console.log('yes');
	// 			mapInnerBox.current.style.setProperty('position', 'fixed');
	// 			mapInnerBox.current.style.setProperty('top', '0');
	// 			//mapInnerBox.current.style.setProperty('position', 'auto');
	// 		} else if (scrolled < offsetMap) {
	// 			setOffsetMap(countOffset(mapInnerBox.current));
	// 			// mapInnerBox.current.style.setProperty('position', 'fixed');
	// 			// mapInnerBox.current.style.setProperty('top', '0');
	// 			mapInnerBox.current.style.setProperty('position', 'unset');
	// 			mapInnerBox.current.style.setProperty('top', 'unset');
	// 			console.log('no');
	// 		}
	// 	};

	// 	window.addEventListener('scroll', onScroll);
	// 	//console.log(offsetMap, 11);
	// 	return () => window.removeEventListener('scroll', onScroll);
	// }, [flag]);

	return (
		<main>
			<div className={styles.contentBox}>
				<InnerHeading />
				<FilterCategory />
				<div className={styles.containerOffers}>
					<ListItems />
				</div>
			</div>
			<div className={styles.mapWrapper}>
				<div className={styles.mapInnerBox}>
					<MapMainPage />
				</div>
			</div>
		</main>
	);
};

export default MainPage;