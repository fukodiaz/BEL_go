import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import { useSearchParams, useNavigate, useLocation } from 'react-router-dom';

import OfferedItem from '../offered-item';
import {compose} from '../hoc';
import { withBelgoService } from '../hoc';
import {fetchOffers, pressLike, offersLoaded,
		offersError,} from '../../actions';
import ErrorIndicator from '../error-indicator';

import styles from './list-items.m.less';

const ListItems = (props) => {
	const { listOffers=[], loading, error, dataCities, 
			filterCategory, authenDataPosted, postLike,} = props;
	const navigate = useNavigate();
	let location = useLocation();

	const [searchParams, setSearchParams] = useSearchParams();
	const [authData, setAuthData] = useState(null);
	const [arrLiked, setArrLiked] = useState([]);


	const [shownOffers, setShownOffers] = useState(listOffers);
	useEffect(() => {
		setShownOffers(listOffers);
		setArrLiked([]);
	}, [filterCategory, listOffers])

	useEffect(() => {
		setAuthData(authenDataPosted);
	}, [authenDataPosted])

	const clickLike = (id) => {
		if (authData == null) {
			navigate('/auth', {state: {previousLocation: location}});
		} else {
			let data = {'idOffer': id};
			postLike(JSON.stringify(data))
				.then(data => {
					setArrLiked((prev = []) => {
						const index = prev.findIndex((item) => item.id === data.id);
						if (index !== -1) {
							const arrNew = [...prev];
							arrNew[index] = { ...arrNew[index], liked: data.liked };
							return arrNew;
						} else {
							return [...prev, data];
						}
					});
				})
				.catch(err => {
					console.log('errLike', err)
				})
		}

		return null
	};

	const createListItems = (data) => {
		const {id} = data;
		const idOffer = id;
		
		const index = arrLiked.findIndex(item => item.id === data.id);
		const isLiked = index !== -1 ? arrLiked[index]?.liked : data?.liked;

		const colorLike = {
			color: isLiked ? 'rgba(230,57,5,1)' : 'rgba(190,190,190,0.3)'
		};
		
		const idCity = dataCities?.filter(({label}) => 
							label == data.city)[0]?.id;
		const concept = data?.conception?.label ? data?.conception?.label : null;

		return (<li key={id} className={styles.itemOffered}>
					<OfferedItem 	{...data} 
									onPressLike={() => clickLike(id)}
									colorLike={colorLike}
									idCity={idCity} concept={concept}
									authData={authData}
									navigate={navigate}
									location={location} />
				</li>);
	};

	return (<>
				{
					loading ? <p className={styles.loadOffers}>Loading...</p> : 
					error ? <ErrorIndicator /> : 
						(<ul className={styles.listOffers}>
							{shownOffers.map(createListItems)}
						</ul>)
				}
			</>);
}


const mapMethodsToProps = (belgoService) => ({
	getListOffers: belgoService.getListOffers,
	postLike: belgoService.postLike,
	postRating: belgoService.postRating
});

const mapStateToProps = (state) => ({
	listOffers: state.listOffers, 
	error: state.error, 
	loading: state.loading, 
	listLikedOffers: state.listLikedOffers,
	filterCategory: state.filterCategory,
	dataCities: state.dataCities,
	authenDataPosted: state.authenDataPosted
});

const mapDispatchToProps = (dispatch, {getListOffers}) => {
	return {
		fetchOffers: fetchOffers(getListOffers, dispatch),
		onPressLike: (id) => dispatch(pressLike(id)),
		offersLoaded: (offers) => dispatch(offersLoaded(offers)),
		offersError: (err) => dispatch(offersError(err)),
	};
};

export default compose(
	withBelgoService(mapMethodsToProps),
	connect(mapStateToProps, mapDispatchToProps)
)(ListItems);