import React from 'react';
import {connect} from 'react-redux';
import { useParams } from 'react-router-dom';

import styles from './page-details.m.less';

const PageDetails = () => {

	const {id} = useParams();

	return (
		<div className={styles.box}>

		</div>
	);
};

const mapStateToProps = ({dataCities, visibleListOffers, filterCities}) => ({
	dataCities,

});

export default connect(mapStateToProps)(PageDetails);