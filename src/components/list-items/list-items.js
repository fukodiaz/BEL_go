import React, {Component} from 'react';
import {connect} from 'react-redux';

import OfferedItem from '../offered-item';
import {compose} from '../hoc';
import { withBelgoService } from '../hoc';
import {fetchOffers} from '../../actions';
import ErrorIndicator from '../error-indicator';

import styles from './list-items.m.less';

class ListItems extends Component {

	componentDidMount() {
		this.props.fetchOffers();
		console.log(this.props.listOffers);
	}

	createListItems = (data) => {
		const {id, ...otherData} = data;
		return (
			<li key={id}>
				<OfferedItem {...otherData} 
						onOpenDetailPage={() => console.log(id)} />
			</li>
		);
	}
	render() {
		const {listOffers, loading, error} = this.props;

		if (loading) {
			console.log(loading);
			return <p>Loading...</p>;
		}

		if (error) {
			console.log(error, 5555);
			return <ErrorIndicator />;
		}

		return (
			<ul className={styles.resetList}>
				{listOffers.map(this.createListItems)}
			</ul>
		);
	}
}


const mapMethodsToProps = (belgoService) => ({
	getListOffers: belgoService.getListOffers
});

const mapStateToProps = ({listOffers, error, loading}) => ({
	listOffers, error, loading
});

const mapDispatchToProps = (dispatch, {getListOffers}) => {
	return {
		fetchOffers: fetchOffers(getListOffers, dispatch)
	};
};

export default compose(
	withBelgoService(mapMethodsToProps),
	connect(mapStateToProps, mapDispatchToProps)
)(ListItems);


