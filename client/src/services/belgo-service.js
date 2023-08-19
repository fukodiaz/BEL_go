export default class BelgoService {

	//_apiBase= 'http://localhost:3000';
	_apiBase= 'https://bel-go-api.vercel.app';
	//_apiBase='https://bel-go.herokuapp.com/api';
	//_apiBase='https://bel-go-api.vercel.app/api';

	getResource = async (url) => {
		const res = await fetch(`${this._apiBase}${url}`);
		
		if (!res.ok) {
			throw new Error (
				`Couldn't fetch ${this._apiBase}${url}, received ${res.status}`); 
		}

		return res.json();
	}; 

	getListOffers = async (qParams='') => {
		const res = await this.getResource(`/offers${qParams}`);
		return res;
	};

	getDataCities = async () => {
		const res = await this.getResource(`/dataCities`);
		return res;
	};

	postData = async (url, data) => {
		const res = await fetch(`${this._apiBase}${url}`, {
			method: 'POST',
			mode: 'cors',
			headers: {
				'Content-type': 'application/json',
				'Access-Control-Allow-Origin': '*'
			},
			body: data
		});
	
		return res.json();
	};

	postLogin = async (json) => {
		const res = await this.postData(`/login`, json);
		return res;
	};

	postSignUp = async (json) => {
		const res = await this.postData(`/signup`, json);
		return res;
	};

}