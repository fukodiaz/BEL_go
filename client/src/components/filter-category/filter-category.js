import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import { Link, useParams } from 'react-router-dom';

import { withBelgoService, compose } from '../hoc';
import {changeFilterCategory, offersRequested, offersLoaded,
		offersError,} from '../../actions';
import CustomSelect from '../custom-select';

import styles from './filter-category.m.less';

const FilterCategory = (props) => {
	const {isActiveFilter, idCityActive,
			postRealEstate, offersRequested, offersLoaded,
			offersError, getConceptions
			} = props;
	const {idConcep} = useParams();

	const filterButtons = [
		{name: 'all', label: 'All'},
		{ name: 'popular', label: 'Popular'},
		{ name: 'price_asc', label: 'Price: low to high'},
		{ name: 'price_desc', label: 'Price: high to low'},
		{ name: 'rating', label: 'Top rated first'}
	];

	const [conceptions, setConceptions] = useState([]);
	const [priceAsc, setPriceAsc] = useState(false);
	const [priceDesc, setPriceDesc] = useState(false);

	useEffect(() => {
		filterItems();

		getConceptions()
			.then(data => {
				data?.map((item) => {
					item['value'] = item['label'];
				});
				
				setConceptions(data);
			}).catch(err => {
				setConceptions([]);
			})

	}, []);

	const filterItems = () => {
		let data = {},
			url = '/real_estate/';
		if (idConcep !== undefined && idConcep !== null) {
			url =`${url}category/${idConcep}/`;
		}
		// console.log('url: ', url)
		// console.log('idCityActive: ', idCityActive)
		if (idCityActive !== undefined && idCityActive !== null) {
			data['city'] = idCityActive;
		} else {
			data['city'] = 1;
		}

		if (priceAsc) {
			data['price_order'] = 'asc';
		} else if (priceDesc) {
			data['price_order'] = 'desc';
		}

		offersRequested();
		postRealEstate(url, JSON.stringify(data))
			.then(data => {
				offersLoaded(data?.data);
				// console.log('sac: ', data)
			}).catch(err => {
				offersError(err);
				// console.log('err: ', err)
			})
	};

	const onFilterCategory = (filter) => {
		switch(filter) {
			case 'price_asc':
				setPriceAsc(!priceAsc);
				setPriceDesc(false);
				break;
			case 'price_desc':
				setPriceDesc(!priceDesc);
				setPriceAsc(false);
				break;
			// default:
			// 	setPriceAsc(false);
			// 	setPriceDesc(false);
		}

	};


	const createListButtons = ({name, label}) => {
		const stylesButtonCategory = ('price_asc' == name && priceAsc) || ('price_desc' == name && priceDesc)
												? 'isActiveButton'
												: 'buttonCategory';
		return (
			<li key={name}>
				<button 	type='button'
							className={styles[stylesButtonCategory]}
							onClick={() => onFilterCategory(name)}>
					{label}
				</button>
			</li>
		);
	}

	return (
		<ul className={styles.listFiltersCateg}>
			{ filterButtons.map(createListButtons) }
			{conceptions?.length ? (
				<CustomSelect options={conceptions}  />
			) : null}

			<li className={styles.itemBtnFilter}>
				<button className={styles.btnFilter}
						onClick={() => filterItems()}
						>
					Find
				</button>
			</li>
		</ul>
	);




}

const mapMethodsToProps = (belgoService) => ({
	postRealEstate: belgoService.postData,
	getConceptions: belgoService.getConceptions
});


const mapStateToProps = ({filterCategory, idCityActive}) => ({
	idCityActive
});

const mapDispatchToProps = (dispatch) => ({
	offersRequested: () => dispatch(offersRequested()),
	offersLoaded: (data) => dispatch(offersLoaded(data)),
	offersError: (err) => dispatch(offersError(err)),
});

// export default connect(mapStateToProps, mapDispatchToProps)(FilterCategory);

export default compose(
	withBelgoService(mapMethodsToProps),
	connect(mapStateToProps, mapDispatchToProps)
)(FilterCategory);