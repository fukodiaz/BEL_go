const initialState = {
	listOffers: [],
	error: false,
	loading: true,

	filterCities: 'Antwerp',
	visibleListOffers: [],

	filterCategory: 'all',

	dataCities: [],
	dataCitiesError: false,
	dataCitiesLoading: true

};

const filterCity = (offers, filter) => {
	return offers.filter( offer => offer.city === filter);
};

const sortOffers = (prop) => (prev, next) => +prev[prop] - +next[prop];

const filterCateg = (filter, offers) => {
	switch(filter) {
		case 'all':
			return offers;
		case 'popular':
			return offers.filter(offer => +offer.rating >= 4.5);
		case 'priceIncr': 
			return offers.sort(sortOffers('price'));
		case 'priceDecr':
			return offers.sort(sortOffers('price')).reverse();
		case 'rating':
			return offers.sort(sortOffers('rating')).reverse();
	}
};

const reducer = (state = initialState, action) => {

	switch (action.type) {
		case 'FETCH_OFFERS_REQUEST':
			return {
				...state,
				listOffers: [],
				error: false,
				loading: true
			}

		case 'FETCH_OFFERS_SUCCESS':
			const visibleListOffers = filterCateg(
				state.filterCategory,
				filterCity(action.payload, state.filterCities));
			return {
				...state,
				listOffers: action.payload,
				loading: false,
				error: false,
				visibleListOffers: visibleListOffers
			}
		
		case 'FETCH_OFFERS_FAILURE':
			return {
				...state,
				loading: false,
				listOffers: [],
				error: action.payload
			}

		case 'FETCH_DATA_CITIES_REQUEST': 
			return {
				...state,
				dataCities: [],
				dataCitiesError: false,
				dataCitiesLoading: true
			}	

		case 'FETCH_DATA_CITIES_SUCCESS':
			return {
				...state,
				dataCities: action.payload,
				dataCitiesError: false,
				dataCitiesLoading: false
			}

		case 'FETCH_DATA_CITIES_FAILURE':
			return {
				...state,
				dataCities: [],
				dataCitiesError: action.payload,
				dataCitiesLoading: false
			}


		case 'CHANGE_FILTER_CITIES':
			const newVisibleListOffers = filterCity(state.listOffers, action.payload);

			return {
				...state,
				filterCities: action.payload,
				visibleListOffers: newVisibleListOffers,
				filterCategory: 'all'
			}

		case 'CHANGE_FILTER_CATEGORY':
			const nVisibleListOffers = filterCateg(action.payload, 
				filterCity(state.listOffers, state.filterCities));
				
		return {
			...state,
			filterCategory: action.payload,
			visibleListOffers: nVisibleListOffers
		}

		default: 
			return state;
	}
};

export default reducer;