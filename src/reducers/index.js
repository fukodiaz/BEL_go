const initialState = {
	listOffers: [],
	error: false,
	loading: true
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
			return {
				...state,
				listOffers: action.payload,
				loading: false,
				error: false
			}
		
		case 'FETCH_OFFERS_FAILURE':
			return {
				...state,
				loading: false,
				listOffers: [],
				error: action.payload
			}

		default: 
			return state;
	}
};

export default reducer;