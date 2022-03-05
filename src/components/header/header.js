import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';

import FilterCities from '../filter-cities';
import LogoHeader from '../logo-header';
import UserNavigation from '../user-navigation';

import styles from './header.m.less';
import imgTab from './back-main-tablet.jpg';
import imgDesk from './back-main-desktop.jpg';

export default class Header extends Component {

	render() {
		
		return (
			<header className={styles.mainheader}>
				<picture>
						<source media="(min-width: 1280px)" srcSet={imgDesk} />
						<source media="(min-width: 768px)" srcSet={imgTab} />
						<img src={imgTab} alt="Belgian atmosphere" />
				</picture>
				<LogoHeader />
				<UserNavigation />
				<FilterCities />
			</header>
		);
	}
}
