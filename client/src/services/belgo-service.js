import {apiBase, axios} from './axios-prep';

export default class BelgoService {

	// _apiBase='https://bel-go-api.onrender.com';
	// _apiBase= 'http://bel_go-api.dvl.to';
	_apiBase = apiBase;
	_apiImages=`${this._apiBase}/images/`;

	getResource = async (url) => {
		const res = await axios.get(url);
		
		if (![200, 201].includes(res.status)) {
			throw new Error (
				`Couldn't fetch ${this._apiBase}${url}, received ${res.status}`); 
		}

		// return res.json();
		return res;
	}; 

	getUser = async () => {
		const res = await this.getResource(`/user`);
		return res.data;
	};

	getListOffers = async (qParams='') => {
		const res = await this.getResource(`/offers${qParams}`);
		return res.data;
	};

	getOffer = async (slug='') => {
		const res = await this.getResource(`/real_estate/${slug}/`);
		return res.data;
	};

	getDataCities = async () => {
		const res = await this.getResource(`/dataCities`);
		return res.data;	
	};

	getConceptions = async () => {
		const res = await this.getResource(`/conceptions`);
		return res.data;
	};

	getLikes = async () => {
		const res = await this.getResource(`/likes`);
		return res.data;
	};

	postData = async (url, data) => {
		const res = await axios.post(url, data);

		return res;
	};

	postLogin = async (json) => {
		const res = await this.postData(`/login`, json);

		return res.data;
	};

	postSignUp = async (json) => {
		const res = await this.postData(`/signup`, json);
		
		return res.data;
	};

	postLike = async (json) => {
		const res = await this.postData(`/like`, json);

		return res.data;
	};

	postRating = async (json) => {
		const res = await this.postData(`/rating`, json);

		return res.data;
	};

	payment = async (json) => {
		const res = await this.postData(`/payment`, json);

		return res.data;
	};
}