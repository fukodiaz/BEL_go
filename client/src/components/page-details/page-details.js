import React, { useState,useEffect } from 'react';
import {connect} from 'react-redux';
import { useParams } from 'react-router-dom';
import { withBelgoService, compose } from '../hoc';

import ItemDetails from '../item-details';
import ErrorIndicator from '../error-indicator';

import styles from './page-details.m.less';

const PageDetails = (props) => {
	const {listOffers, idCityActive, getOffer} = props;
	const {id: idPage} = useParams();
	const [load, setLoad] = useState(false);
	const [offer, setOffer] = useState(null);
	const [error, setError] = useState(null);

	useEffect(() => {
		window.scrollTo(0, 315);

		setLoad(true);
		getOffer(idPage)
			.then(data => {		
				setOffer(data);
				setError(null);
			})
			.catch(err => {
				setOffer(null);
				setError(true);
			})
			.finally(() => {
				setLoad(false);
    			// console.log("loading is ended");
  			});
	}, []);

	return (
		<div className={styles.boxDetails}>
			{
				load ? <p className={styles.loadOffers}>Loading...</p> :
				error ? <ErrorIndicator /> : 
				offer != null ? (	
					<ItemDetails key={offer.id} {...offer} />
				) : null	
			}
		</div>
	);
};

const mapMethodsToProps = (belgoService) => ({
	getOffer: belgoService.getOffer,
});

const mapStateToProps = ({ listOffers, idCityActive }) => ({
	listOffers,
	idCityActive
});



export default compose(
	withBelgoService(mapMethodsToProps),
	connect(mapStateToProps)
)(PageDetails);