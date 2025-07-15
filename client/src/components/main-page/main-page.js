import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';

import ListItems from '../list-items';
import FilterCategory from '../filter-category';
import InnerHeading from '../inner-heading';
import MapMainPage from '../map-main-page';
import {isMainPage} from '../../actions';

import styles from './main-page.m.less';


const MainPage = ({idCityActive, isMainPage}) => {
	//flag for render cities-filters
	useEffect(() => {
		isMainPage(true);

		return () => {
			isMainPage(false);
		};
	}, []);

	return (
		<main>
			<div className={styles.contentBox}>
				{
					idCityActive ? <InnerHeading /> : 'Please, choose some city'
				}
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

const mapStateToProps = ({idCityActive}) => ({
	idCityActive
});

const mapDispatchToProps = (dispatch) => ({
	isMainPage: (flag) => dispatch(isMainPage(flag)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);