/* eslint-disable import/prefer-default-export */
import api from '../api';

import { GetAllLocationsFiltersProps, GetAllLocationsProps, LocationSchema } from './types';
import { convertObjectToQueryString } from '@/helpers/utils';

const LOCATION_ENDPOINT = '/location';

export async function getAllLocationsByFilter(filters?: GetAllLocationsFiltersProps):
	Promise<GetAllLocationsProps> {
	try {
		const querys = convertObjectToQueryString(filters || {});
		const response = await api.get(`${LOCATION_ENDPOINT}${querys}`);
		return response.data;
	} catch (err) {
		throw new Error('Unexpected error');
	}
}

export async function getLocationsByIDList(ids: string[]): Promise<LocationSchema[]> {
	try {
		const response = await api.get(`${LOCATION_ENDPOINT}/${ids.join(',')}`);
		if (Array.isArray(response.data)) return response.data;
		if (typeof response.data === 'object') return [response.data];
		return [];
	} catch (err) {
		throw new Error('Unexpected error');
	}
}

export async function getOneLocationByID(id: string): Promise<LocationSchema> {
	try {
		const response = await api.get(`${LOCATION_ENDPOINT}/${id}`);
		return response.data;
	} catch (err) {
		throw new Error('Unexpected error');
	}
}
