import React from 'react';
import {connect} from 'react-redux';

import styles from './inner-heading.m.less';

const InnerHeading = ({idCityActive, dataCities, visibleListOffers}) => {
	const activeCity = dataCities?.filter(({id}) => {
		return id == idCityActive
	})[0]?.label;

	return (<h2 className={styles.innerHeading}>
				{
					activeCity ? 
						`${visibleListOffers.length} places to stay in ${activeCity}` 
						: "Offers aren't defined"
				}
			</h2>);
};

const mapStateToProps = ({idCityActive, visibleListOffers, dataCities}) => ({
	idCityActive,
	visibleListOffers,
	dataCities
});

export default connect(mapStateToProps)(InnerHeading);