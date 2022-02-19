const initialState = {
	listOffers: [],
	error: false,
	loading: true,

	filterCities: 'Antwerp',
	visibleListOffers: []

};

const filter = (offers, filter) => {
	return offers.filter( offer => offer.city === filter);
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
			const visibleListOffers = filter(action.payload, state.filterCities);
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

		case 'CHANGE_FILTER_CITIES':
			const newVisibleListOffers = filter(state.listOffers, action.payload);
			return {
				...state,
				filterCities: action.payload,
				visibleListOffers: newVisibleListOffers
			}

		default: 
			return state;
	}
};

export default reducer;