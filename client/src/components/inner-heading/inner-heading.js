import React from 'react';
import {connect} from 'react-redux';

import styles from './inner-heading.m.less';

const InnerHeading = ({idCityActive, dataCities, visibleListOffers}) => {
	const activeCity = dataCities.map(({id, label}) => {
		if (id == idCityActive) 
			return label;
		return null;
	})

	return (<h2 className={styles.innerHeading}>
				{
					activeCity ? `${visibleListOffers.length} places to stay in ` 
										: 'Please, choose some city'
				}
				{ activeCity && activeCity}
			</h2>);
};

const mapStateToProps = ({idCityActive, visibleListOffers, dataCities}) => ({
	idCityActive,
	visibleListOffers,
	dataCities
});

export default connect(mapStateToProps)(InnerHeading);