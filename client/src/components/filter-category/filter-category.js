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
		// {name: 'all', label: 'All'},
		// pupular i.e. rating > 3
		// { name: 'popular', label: 'Popular'},
		{ name: 'rating', label: 'Top rated first'},
		{ name: 'price_asc', label: 'Price: low to high'},
		{ name: 'price_desc', label: 'Price: high to low'},
		// rating - orderby (desc)
		// { name: 'rating', label: 'Top rated first'},
		{ name: 'popular', label: 'Popular'},
	];

	const [conceptions, setConceptions] = useState([]);
	const [priceAsc, setPriceAsc] = useState(false);
	const [priceDesc, setPriceDesc] = useState(false);
	const [ratingDesc, setRatingDesc] = useState("");
	const [popular, setPopular] = useState(null);
	const [search, setSearch] = useState("");


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
			url = '/real_estate';
		if (idConcep !== undefined && idConcep !== null) {
			url =`${url}/category/${idConcep}/`;
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

		if (ratingDesc == 'desc') {
			data['rating_order'] = 'desc';
		}

		if (popular != undefined && popular != null) {
			data['popular'] = popular;
		}

		if (search != "") 
			data['search'] = search;

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
			case 'rating':
				setRatingDesc(prev => prev != 'desc' ? 'desc' : '');
				break;
			case 'popular':
				setPopular(prev => prev != undefined && prev != null ? null : 3);
				break;
			// default:
			// 	setPriceAsc(false);
			// 	setPriceDesc(false);
		}

	};

	const handleSearch = (e) => {
		e.preventDefault();
		setSearch(e.target.value);
	}


	const createListButtons = ({name, label}) => {
		const stylesButtonCategory = ('price_asc' == name && priceAsc) || ('price_desc' == name && priceDesc) ||
									 ('rating' == name && ratingDesc != "") || 
									 ('popular' == name && popular != null && popular != undefined)
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
		<div>
			<p className={styles.boxInputSearch}>
				<input 
					type="search" 
					name="search"
					placeholder="Search"
					className={styles.inputSearch}
					value={search}
					onChange={(e) => handleSearch(e)}
					 />
			</p>
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
		</div>
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