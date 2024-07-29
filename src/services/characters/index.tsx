/* eslint-disable import/prefer-default-export */
import api from '../api';

import { GetAllCharacterFiltersProps, GetAllCharacterProps } from './types';
import { convertObjectToQueryString } from '@/helpers/utils';

const CHARACTER_ENDPOINT = '/character';

export async function getAllChachersByFilter(filters?: GetAllCharacterFiltersProps):
	Promise<GetAllCharacterProps> {
	try {
		const querys = convertObjectToQueryString(filters || {});
		const response = await api.get(`${CHARACTER_ENDPOINT}${querys}`);
		return response.data;
	} catch (err) {
		throw new Error('Unexpected error');
	}
}
