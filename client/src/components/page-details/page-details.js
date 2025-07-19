import React, { useState,useEffect } from 'react';
import {connect} from 'react-redux';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { withBelgoService, compose } from '../hoc';

import ItemDetails from '../item-details';
import ErrorIndicator from '../error-indicator';
import  {openModal}  from '../../utils';

import styles from './page-details.m.less';

const PageDetails = (props) => {
	const {getOffer, payment, authenDataPosted, } = props;
	const {id: idPage} = useParams();
	let location = useLocation();
	const navigate = useNavigate();
	const [authData, setAuthData] = useState(null);
	const [load, setLoad] = useState(false);
	const [offer, setOffer] = useState(null);
	const [error, setError] = useState(null);
	const [isLoadPay, setIsLoadPay] = useState(false);
	const [isConfirmPay, setIsConfirmPay] = useState(false);
	const [urlConfirm, setUrlConfirm] = useState('');
	const absURL = window.location.href;

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

	useEffect(() => {
		setAuthData(authenDataPosted);
	}, [authenDataPosted])

	const handlePayment = ($amount, $description) => {
		// console.log('absUrl: ', absURL, 'dop: ', $dop);
		if (authData == null) {
			navigate('/auth', {state: {previousLocation: location}});
		} else {
			let data = {
				'amount': $amount, 
				'description': $description,
				'urlReturn': absURL
				};

			setIsLoadPay(true);
			payment(data)
				.then(payment => {
					setIsConfirmPay(true);
					setUrlConfirm(payment?.urlConfirm)
					console.log('data-payment', payment);
				})
				.catch(err => {
					console.log('errPayment', err)
					openModal('[class^="modalBox"]', 'Something is wrong with payment');
				})
				.finally(() => {
					setIsLoadPay(false);
				});
		}

	};

	const cancelPay = () => {
		setIsConfirmPay(false);
	};

	return (
		<div className={styles.boxDetails}>
			{
				load ? <p className={styles.loadOffers}>Loading...</p> :
				error ? <ErrorIndicator /> : 
				offer != null ? (	
					<ItemDetails 
						key={offer.id} 
						{...offer} 
						isLoadPay={isLoadPay}
						handlePayment={handlePayment}
						isConfirmPay={isConfirmPay}
						urlConfirm={urlConfirm}
						cancelPay={cancelPay}
						 />
				) : null	
			}
		</div>
	);
};

const mapMethodsToProps = (belgoService) => ({
	getOffer: belgoService.getOffer,
	payment: belgoService.payment
});

const mapStateToProps = ({ listOffers, idCityActive, authenDataPosted }) => ({
	listOffers,
	idCityActive,
	authenDataPosted
});



export default compose(
	withBelgoService(mapMethodsToProps),
	connect(mapStateToProps)
)(PageDetails);