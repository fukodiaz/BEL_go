import React from 'react';
import {connect} from 'react-redux';

import OfferedItem from '../offered-item';
import {pressLike} from '../../actions';

import styles from './list-liked-offers.m.less';

const ListLikedOffers = (props) => {
	const {listLikedOffers, dataCities} = props;

	const createListItems = (data) => {
		const {id} = data;
		const idCity = dataCities.filter(({label}) => 
							label == data.city)[0]['id']
		return (
			<li key={id} className={styles.itemOffered}>
				<OfferedItem {...data} 
									onPressLike={() => this.props.onPressLike(id)}
									colorLike={{color: 'rgba(230,57,5, 1)'}}
									idCity={idCity} />
			</li>
		);
	}

	return (
		<div>
			<h2 className={styles.headerListLikes}>
				My list of favorite offers (
					<span>{listLikedOffers.length}</span>
					)
			</h2>
			<ul className={styles.listOffers}>
				{listLikedOffers.map(createListItems)}
			</ul>
		</div>
	);
}


const mapStateToProps = ({listLikedOffers, dataCities}) => ({
	listLikedOffers,
	dataCities
});

const mapDispatchToProps = (dispatch) => {
	return {
		onPressLike: (id) => dispatch(pressLike(id))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ListLikedOffers);