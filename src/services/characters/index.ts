/* eslint-disable import/prefer-default-export */
import api from '../api';

import { CharacterSchema, GetAllCharacterFiltersProps, GetAllCharacterProps } from './types';
import { convertObjectToQueryString } from '@/helpers/utils';

const CHARACTER_ENDPOINT = '/character';

export async function getAllCharactersByFilter(filters?: GetAllCharacterFiltersProps):
	Promise<GetAllCharacterProps> {
	try {
		const querys = convertObjectToQueryString(filters || {});
		const response = await api.get(`${CHARACTER_ENDPOINT}${querys}`);
		return response.data;
	} catch (err) {
		throw new Error('Unexpected error');
	}
}

export async function getCharactersByIDList(ids: string[]): Promise<CharacterSchema[]> {
	try {
		const response = await api.get(`${CHARACTER_ENDPOINT}/${ids.join(',')}`);
		if (Array.isArray(response.data)) return response.data;
		if (typeof response.data === 'object') return [response.data];
		return [];
	} catch (err) {
		throw new Error('Unexpected error');
	}
}

export async function getOneCharacterByID(id: string): Promise<CharacterSchema> {
	try {
		const response = await api.get(`${CHARACTER_ENDPOINT}/${id}`);
		return response.data;
	} catch (err) {
		throw new Error('Unexpected error');
	}
}
