const initialState = {
	listOffers: [],
	error: false,
	loading: true,

	idCityActive: 1,
	visibleListOffers: [],

	filterCategory: 'all',

	dataCities: [],
	dataCitiesError: false,
	dataCitiesLoading: true,

	authenSending:  false,
	authenDataPosted: [],
	authenError:  false,
	isLogged: false,
	authStatus: 'login', //login or signup

	listLikedOffers: JSON.parse(window.localStorage.getItem('listLikedOffers')) || [],
};

const filterCity = (offers=[], filter) => {
	return offers.filter( offer => offer.city === filter);
};

const sortOffers = (prop) => (prev, next) => +prev[prop] - +next[prop];

const filterCateg = (filter, offers=[]) => {
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
		default:
			return offers;
	}
};


const createListLikedOffers = (state, idOffer) => {
	const {listOffers, listLikedOffers} = state;
	const offer = listOffers.find(({id}) => id == idOffer);
	const itemIndex = listLikedOffers.findIndex(({id}) => id == idOffer);
	let newListLikedOffers = [];

	if (itemIndex < 0) {
		const newItemLiked = {...offer, like: true};
		newListLikedOffers = [...listLikedOffers, newItemLiked];
		window.localStorage.setItem('listLikedOffers', JSON.stringify(newListLikedOffers));

		return newListLikedOffers;
	} else {
		newListLikedOffers =  [...listLikedOffers.slice(0, itemIndex), 
									...listLikedOffers.slice(itemIndex + 1)];
		window.localStorage.setItem('listLikedOffers', JSON.stringify(newListLikedOffers));
		
		return newListLikedOffers;
	}
};

const reducer = (state = initialState, action) => {

	switch (action.type) {
		//authentication
		case 'AUTHEN_SENDING':
			return {
				...state,
				authenSending: true,
				authenDataPosted: [],
				authenError:  false
			}

		case 'LOGIN_SUCCESS':
			return {
				...state,
				authenSending: false,
				authenDataPosted: action.payload,
				authenError:  false,
				isLogged: true
			}

		case 'SIGNUP_SUCCESS':
			return {
				...state,
				authenSending: false,
				authenDataPosted: action.payload,
				authenError:  false
			}

		case 'AUTHEN_ERROR':
			return {
				...state,
				authenSending: false,
				authenDataPosted: [],
				authenError:  action.payload
			}

		case 'ON_AUTH_STATUS':
			return {
				...state,
				authStatus: action.payload
			}

		//data-offers
		case 'FETCH_OFFERS_REQUEST':
			return {
				...state,
				listOffers: [],
				visibleListOffers: [],
				error: false,
				loading: true
			}

		case 'FETCH_OFFERS_SUCCESS':
			const visibleListOffers = filterCateg(
				state.filterCategory, action.payload);
			
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

		//Likes
		case 'PRESS_LIKE':
			return {
				...state,
				listLikedOffers: createListLikedOffers(state, action.payload)
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

		//id of chosen city
		case 'CHANGE_FILTER_CITIES':
			return {
				...state,
				idCityActive: action.payload,
				filterCategory: 'all'
			}

		case 'CHANGE_FILTER_CATEGORY':
			// const nVisibleListOffers = filterCateg(action.payload, 
			// 	filterCity(state.listOffers, state.idCityActive));
			const nVisibleListOffers = filterCateg(
				action.payload, state.listOffers);
				
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