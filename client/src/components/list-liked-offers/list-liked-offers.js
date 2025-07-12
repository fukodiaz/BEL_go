import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import { withBelgoService, compose } from '../hoc';

import OfferedItem from '../offered-item';
import {pressLike, likedRequested, likedLoaded,
		likedError} from '../../actions';

import styles from './list-liked-offers.m.less';

const ListLikedOffers = (props) => {
	const {likedOffers, dataCities, getLikes, likedLoaded,
			likedError} = props;

	useEffect(() => {
		//проверка на авторизацию
		getLikes()
			.then(data => {
				likedLoaded(data);
				console.log('likedList: ', data)
			}).catch(err => {
				likedError(err);
				console.log('errLikedList: ', err)
			})
	}, []);


	const createListItems = (data) => {
		const {id} = data;
		const idCity = dataCities?.filter(({label}) => 
							label == data.city)[0]?.id
		return (
			<li key={id} className={styles.itemOffered}>
				<OfferedItem {...data} 
									onPressLike={() => props.onPressLike(id)}
									colorLike={{color: 'rgba(230,57,5, 1)'}}
									idCity={idCity}
									pageLikes={true} />
			</li>
		);
	}

	return (
		<div className={styles.blockFavorites}>
			<h2 className={styles.headerListLikes}>
				My list of favorite offers (
					<span>{likedOffers.length}</span>
					)
			</h2>
			<ul className={styles.listOffers}>
				{likedOffers?.map(createListItems)}
			</ul>
		</div>
	);
}

const mapMethodsToProps = (belgoService) => ({
	getLikes: belgoService.getLikes
});


const mapStateToProps = ({likedOffers, dataCities}) => ({
	likedOffers,
	dataCities
});

const mapDispatchToProps = (dispatch) => {
	return {
		onPressLike: (id) => dispatch(pressLike(id)),
		likedLoaded: (data) => dispatch(likedLoaded(data)),
		likedError: (err) => dispatch(likedError(err))
	};
};

// export default connect(mapStateToProps, mapDispatchToProps)(ListLikedOffers);
export default compose(
	withBelgoService(mapMethodsToProps),
	connect(mapStateToProps, mapDispatchToProps)
)(ListLikedOffers);