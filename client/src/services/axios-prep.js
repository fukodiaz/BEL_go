import axiosLib from 'axios';
import Cookies from 'js-cookie';

// const url = 'http://bel_go-api.dvl.to/api';
export const apiBase = 'http://bel_go-api.dvl.to';
const url = '/api';

export const axios = axiosLib.create({
    baseURL: url,
    withCredentials: true,
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
})

//for sending cookies
// axios.defaults.withCredentials = true;
axios.interceptors.request.use(async (config) => {
    if (config.method?.toLowerCase() !== 'get') {
        await axios.get('/csrf-cookie').then()
        config.headers['X-XSRF-TOKEN'] = Cookies.get('XSRF-TOKEN')
    }

    return config;
});
