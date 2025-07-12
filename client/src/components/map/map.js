import React, {Fragment} from 'react';
import {connect} from 'react-redux';
import { useParams } from 'react-router-dom';

import MapTemplate from '../map-template';
import ErrorIndicator from '../error-indicator';

import styles from './map.m.less';
import "leaflet/dist/leaflet.css";

const Map = (props) => {

	const {dataCities, loading, error, idCityActive,
			dataSpots, stylesMapContainer, address_detail} = props;
	// const {id: idPage} = useParams();
	
	// const filterDataSpots = (data) => {
	// 	if (idPage == data.id) {
	// 		return data;
	// 	} else {
	// 		if (idPage == undefined) {
	// 			return data;
	// 		}
	// 	}
	// };

	if (loading) {
		return <p>Loading...</p>;
	}

	if (error) {
		return <ErrorIndicator />;
	}

	return (
		<Fragment>
			{
				dataCities?.map(({id, label, lat, lng}) => {
					if ( id == idCityActive) {
						const center = [lat, lng];
						
						return <MapTemplate 	key={label} 
													center={center} 
													dataSpots={dataSpots}
													activeCity={label}
													stylesMapContainer={stylesMapContainer}
													address_detail={address_detail}
													/>;
					}
				})
			} 
		</Fragment>
	);
};

const mapStateToProps = ({dataCities, dataCitiesLoading, dataCitiesError, idCityActive, listOffers}) => ({
	dataCities,
	loading: dataCitiesLoading,
	error: dataCitiesError,
	idCityActive,
	dataSpots: listOffers
});

export default connect(mapStateToProps)(Map);