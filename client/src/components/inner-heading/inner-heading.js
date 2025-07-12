import React from 'react';
import {connect} from 'react-redux';

import styles from './inner-heading.m.less';

const InnerHeading = ({idCityActive, dataCities, listOffers, cityForOffers}) => {

	return (<h2 className={styles.innerHeading}>
				{
					cityForOffers ? 
						`${listOffers?.length} places to stay in ${cityForOffers}` 
						: "Offers aren't defined"
				}
			</h2>);
};

const mapStateToProps = ({idCityActive, listOffers, dataCities, cityForOffers}) => ({
	idCityActive,
	listOffers,
	dataCities,
	cityForOffers
});

export default connect(mapStateToProps)(InnerHeading);