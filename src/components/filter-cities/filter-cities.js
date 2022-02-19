import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';

import {changeFilterCities} from '../../actions';

import styles from './filter-cities.m.less';

class FilterCities extends Component {
	cities = [
		{
			id: 'antwerp',
			label: 'Antwerp'
		},
		{
			id: 'bruges',
			label: 'Bruges'
		},
		{
			id: 'charleroi',
			label: 'Charleroi'
		},
		{
			id: 'liege',
			label: 'Liege'
		}
	];

	componentDidMount() {
		console.log(this.props.isActiveFilter);
	}

	componentDidUpdate({isActiveFilter}) {
		if (this.props.isActiveFilter !== isActiveFilter) {
			console.log(this.props.isActiveFilter);
		}
	}

	render() {
		const {onChangeFilterCities, isActiveFilter} = this.props;
		return (
			<ul className={styles.navigation}>
				{
					this.cities.map(({id, label}) => {
						let classLink = isActiveFilter === label ? 'isActiveLink' : 'linkCity';
						return (
							<li key={id}>
								<Link to="" className={styles[classLink]}
										onClick={() => onChangeFilterCities(label)}>
									{label}
								</Link>
							</li>
						);
					})
				}
			</ul>
		);
	}
}

const mapStateToProps = ({filterCities}) => ({
	isActiveFilter: filterCities
});

const mapDispatchToProps = (dispatch) => ({
	onChangeFilterCities: (filter) => dispatch(changeFilterCities(filter))
});

export default connect(mapStateToProps, mapDispatchToProps)(FilterCities);