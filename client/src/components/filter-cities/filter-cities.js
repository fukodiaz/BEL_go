import React, {useState, useEffect} from 'react';
import { Link, useSearchParams, 
			useNavigate } from 'react-router-dom';
import {connect} from 'react-redux';

import {compose} from '../hoc';
import { withBelgoService } from '../hoc';
import { fetchDataCities, changeFilterCities, 
			fetchOffers } from '../../actions';

import styles from './filter-cities.m.less';

const FilterCities = (props) => {
	const {onSwitchCity, idCityActive, fetchDataCities,
			dataCities, fetchOffers} = props;

	useEffect(() => {
		fetchDataCities();
	}, []);

	return (
		<ul className={styles.navigation}>
			{
				dataCities?.map(({id, label}) => {
					let classLink = idCityActive == id ? 'isActiveLink' : 'linkCity';
					return (
						<li key={id}>
							<button className={styles[classLink]}
									onClick={() => { onSwitchCity(id) }}>
								{label}
							</button>
						</li>
					);
				})
			}
		</ul>
	);
}

const mapMethodsToProps = (belgoService) => ({
	getDataCities: belgoService.getDataCities,
	getListOffers: belgoService.getListOffers
});

const mapStateToProps = ({idCityActive, dataCities}) => ({
	idCityActive,
	dataCities
});

const mapDispatchToProps = (dispatch, {getDataCities, getListOffers}) => ({
	onSwitchCity: (filter) => dispatch(changeFilterCities(filter)),
	fetchDataCities: fetchDataCities(getDataCities, dispatch),
	fetchOffers: fetchOffers(getListOffers, dispatch)
});

export default compose(
	withBelgoService(mapMethodsToProps),
	connect(mapStateToProps, mapDispatchToProps)
)(FilterCities);