import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';

import MapTemplate from '../map-template';
import ErrorIndicator from '../error-indicator';

import styles from './map.m.less';

class Map extends Component {

	render() {
		const {dataCities, loading, error, activeCity, dataSpots} = this.props;

		if (loading) {
			return <p>Loading...</p>;
		}

		if (error) {
			return <ErrorIndicator />;
		}

		return (
			<Fragment>
				{
					dataCities.map(({label, lat, lng}) => {
						if (label === activeCity) {
							const center = [lat, lng];
							
							return <MapTemplate 	key={label} 
														center={center} 
														dataSpots={dataSpots} 
														styles={styles.map} />;
						}
					})
				} 
			</Fragment>
		);
	}
}

const mapStateToProps = ({dataCities, dataCitiesLoading, dataCitiesError, filterCities, visibleListOffers}) => ({
	dataCities,
	loading: dataCitiesLoading,
	error: dataCitiesError,
	activeCity: filterCities,
	dataSpots: visibleListOffers
});

export default connect(mapStateToProps)(Map);