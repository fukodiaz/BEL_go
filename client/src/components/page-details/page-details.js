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
	const [offer, setOffer] = useState(null);

	useEffect(() => {
		window.scrollTo(0, 315);

		getOffer(idPage)
			.then(data => {		
				setOffer(data);
			})
			.catch(err => {
				setOffer(null);
			});
	}, []);

	return (
		<div className={styles.boxDetails}>
			{
				offer != null ? (	
					<ItemDetails key={offer.id} {...offer} />
				) : <ErrorIndicator />		
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