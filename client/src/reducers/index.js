const initialState = {
	listOffers: [],
	error: false,
	loading: true,
	cityForOffers: '',

	idCityActive: 1,

	filterCategory: 'all',

	dataCities: [],
	dataCitiesError: false,
	dataCitiesLoading: true,

	authenSending:  false,
	authenDataPosted: null,
	authenError:  false,
	isLogged: false,
	authStatus: 'login', //login or signup

	likedOffers: [],
	errorLiked: false,
	loadingLiked: false,
};

const filterCity = (offers=[], filter) => {
	return offers.filter( offer => offer.city === filter);
};

const sortOffers = (prop) => (prev, next) => +prev[prop] - +next[prop];


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
				authenDataPosted: null,
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
				authenDataPosted: null,
				authenError:  action.payload
			}

		case 'ON_AUTH_STATUS':
			return {
				...state,
				authStatus: action.payload
			}

		//data-offers
		case 'FETCH_OFFERS_REQUEST':
			// console.log('fffff');
			return {
				...state,
				listOffers: [],
				error: false,
				loading: true,
				cityForOffers: ''
			}

		case 'FETCH_OFFERS_SUCCESS':
			// console.log('offers_suc: ', action.payload);
			const cityForOffers = action?.payload[0]?.city['label'] ? action?.payload[0]?.city['label'] : '';

			return {
				...state,
				listOffers: action.payload,
				loading: false,
				error: false,
				cityForOffers
			}
		
		case 'FETCH_OFFERS_FAILURE':
			// console.log('offers_errr: ', action.payload);
			return {
				...state,
				loading: false,
				listOffers: [],
				error: action.payload,
				cityForOffers: ''
			}

		//Likes
		case 'PRESS_LIKE':
			return {
				...state,
				// likedOffers: createListLikedOffers(state, action.payload)
			}

		case 'FETCH_LIKED_REQUEST':
			return {
				...state,
				likedOffers: [],
				errorLiked: false,
				loadingLiked: true,
			}

		case 'FETCH_LIKED_SUCCESS':
			return {
				...state,
				likedOffers: action.payload,
				loadingLiked: false,
				errorLiked: false,
			}
		
		case 'FETCH_LIKED_FAILURE':
			// console.log('offers_errr: ', action.payload);
			return {
				...state,
				loadingLiked: false,
				likedOffers: [],
				errorLiked: action.payload,	
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
			}

		default: 
			return state;
	}
};

export default reducer;