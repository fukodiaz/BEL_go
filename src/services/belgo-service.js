export default class BelgoService {

	_apiBase= 'http://localhost:3000';

	getResource = async (url) => {
		const res = await fetch(`${this._apiBase}${url}`);
		
		if (!res.ok) {
			throw new Error (
				`Couldn't fetch ${this._apiBase}${url}, received ${res.status}`); 
		}

		return res.json();
	}; 

	getListOffers = async () => {
		const res = await this.getResource(`/offers`);
		return res;
	};


}