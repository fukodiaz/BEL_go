import React, {useEffect} from 'react';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';

import FilterCities from '../filter-cities';
import LogoHeader from '../logo-header';
import UserNavigation from '../user-navigation';
import { withBelgoService, compose } from '../hoc';
import {loginSuccess, authenError,} from '../../actions';

import styles from './header.m.less';
import imgMobil from './back-main-mobile.jpg';
import imgTab from './back-main-tablet.jpg';
import imgDesk from './back-main-desktop.jpg';

function Header({getUser, loginSuccess, authenError}) {
	useEffect(()=> {
		getUser()
			.then(data => {
				loginSuccess(data);
				console.log('logSucc', data)
			})
			.catch(err => {
				authenError(err);
				console.log('errlog: ', err)
			})
	}, []);
		
	return (
		<header className={styles.mainHeader}>
			<picture>
					<source media="(min-width: 1280px)" srcSet={imgDesk} />
					<source media="(min-width: 768px)" srcSet={imgTab} />
					<img src={imgMobil} alt="Belgium" />
			</picture>
			<LogoHeader />
			<UserNavigation />
			<FilterCities />
		</header>
	);

}

const mapMethodsToProps = (belgoService) => ({
	getUser: belgoService.getUser,
});

const mapDispatchToProps = (dispatch) => ({
	loginSuccess: (data) => dispatch(loginSuccess(data)),
	authenError: (err) => dispatch(authenError(err)),
});

const mapStateToProps = ({filterCategory, idCityActive}) => ({
	idCityActive
});

//export default Header;

export default compose(
	withBelgoService(mapMethodsToProps),
	connect(mapStateToProps, mapDispatchToProps)
)(Header);