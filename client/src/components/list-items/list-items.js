import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import { useSearchParams } from 'react-router-dom';

import OfferedItem from '../offered-item';
import {compose} from '../hoc';
import { withBelgoService } from '../hoc';
import {fetchOffers, pressLike} from '../../actions';
import ErrorIndicator from '../error-indicator';

import styles from './list-items.m.less';

const ListItems = (props) => {
	const { visibleListOffers, loading, error, fetchOffers,
			listLikedOffers, onPressLike, dataCities } = props;
	const [searchParams, setSearchParams] = useSearchParams();

	//getting list of offers
	useEffect(() => {
		let idCity = searchParams.get('idCity')
		if (!idCity) {
			fetchOffers('?idCity=1')
		}
	}, [])

	const createListItems = (data) => {
		const {id} = data;
		const idOffer = id;
		const flagLikedOffer = listLikedOffers.some(({id}) => 
										id === idOffer);
		const colorLike = flagLikedOffer ? {color: 'rgba(230,57,5, 1)'} 
													: {color: 'rgba(190,190,190, 0.3)'};
		const idCity = dataCities.filter(({label}) => 
							label == data.city)[0]['id']

		return (<li key={id} className={styles.itemOffered}>
					<OfferedItem {...data} 
									onPressLike={() => onPressLike(id)}
									colorLike={colorLike}
									idCity={idCity} />
				</li>);
	};

	return (<>
				{
					loading ? <p>Loading...</p> : 
					error ? <ErrorIndicator /> : 
						(<ul className={styles.listOffers}>
							{visibleListOffers.map(createListItems)}
						</ul>)
				}
			</>);
}


const mapMethodsToProps = (belgoService) => ({
	getListOffers: belgoService.getListOffers
});

const mapStateToProps = (state) => ({
	visibleListOffers: state.visibleListOffers, 
	error: state.error, 
	loading: state.loading, 
	listLikedOffers: state.listLikedOffers,
	dataCities: state.dataCities
});

const mapDispatchToProps = (dispatch, {getListOffers}) => {
	return {
		fetchOffers: fetchOffers(getListOffers, dispatch),
		onPressLike: (id) => dispatch(pressLike(id))
	};
};

export default compose(
	withBelgoService(mapMethodsToProps),
	connect(mapStateToProps, mapDispatchToProps)
)(ListItems);