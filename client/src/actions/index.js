const offersRequested = () => ({type: 'FETCH_OFFERS_REQUEST'});

const offersLoaded = (payload) => ({
		type: 'FETCH_OFFERS_SUCCESS',
		payload
});

const offersError = (payload) => ({
	type: 'FETCH_OFFERS_FAILURE',
	payload
});

const fetchOffers = (methodService, dispatch) => (qParams='?id=1') => {
	dispatch(offersRequested());
	methodService(qParams)
		.then(data => dispatch(offersLoaded(data)))
		.catch(error => dispatch(offersError(error)));
};

const isMainPage = (payload) => ({
	type: 'IS_MAIN_PAGE',
	payload
});

//dataCities

const dataCitiesRequested = () => ({type: 'FETCH_DATA_CITIES_REQUEST'});

const dataCitiesLoaded = (payload) => ({
		type: 'FETCH_DATA_CITIES_SUCCESS',
		payload
});

const dataCitiesError = (payload) => ({
	type: 'FETCH_DATA_CITIES_FAILURE',
	payload
});

const fetchDataCities = (methodService, dispatch) => (qParams='') => {
	dispatch(dataCitiesRequested());
	methodService(qParams)
		.then(data => dispatch(dataCitiesLoaded(data)))
		.catch(error => dispatch(dataCitiesError(error)));
};


const changeFilterCities = (payload) => ({
	type: 'CHANGE_FILTER_CITIES',
	payload
});

const changeFilterCategory = (payload) => ({
	type: 'CHANGE_FILTER_CATEGORY',
	payload
});


// post form eith authentication

const authenSending = () => ({type: 'AUTHEN_SENDING'});

const loginSuccess = (payload) => ({
		type: 'LOGIN_SUCCESS',
		payload
});

const signUpSuccess = (payload) => ({
	type: 'SIGNUP_SUCCESS',
	payload
});

const authenError = (payload) => ({
	type: 'AUTHEN_ERROR',
	payload
});

//switch between signup and login
const onAuthStatus = (payload) => ({
	type: 'ON_AUTH_STATUS',
	payload
});

// Likes
const pressLike = (payload) => ({
	type: 'PRESS_LIKE',
	payload
});

const likedRequested = () => ({type: 'FETCH_LIKED_REQUEST'});

const likedLoaded = (payload) => ({
		type: 'FETCH_LIKED_SUCCESS',
		payload
});

const likedError = (payload) => ({
	type: 'FETCH_LIKED_FAILURE',
	payload
});



export {
	offersRequested,
	offersLoaded,
	offersError,
	isMainPage,
	fetchOffers,
	changeFilterCities,
	changeFilterCategory,
	fetchDataCities,
	authenSending,
	loginSuccess,
	signUpSuccess,
	authenError,
	onAuthStatus,
	pressLike,
	likedRequested,
	likedLoaded,
	likedError
};