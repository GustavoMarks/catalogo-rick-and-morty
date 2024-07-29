import axios from 'axios';

import constants from '@/helpers/constants';

const api = axios.create({
	baseURL: constants.URL_API,
});

export default api;
