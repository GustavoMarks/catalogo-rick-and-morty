/* eslint-disable import/prefer-default-export */
import api from '../api';

import { EpisodeSchema, GetAllEpisodesProps, GetAllEpisodesFiltersProps } from './types';
import { convertObjectToQueryString } from '@/helpers/utils';

const EPISODE_ENDPOINT = '/episode';

export async function getAllEpisodesByFilter(filters?: GetAllEpisodesFiltersProps):
	Promise<GetAllEpisodesProps> {
	try {
		const querys = convertObjectToQueryString(filters || {});
		const response = await api.get(`${EPISODE_ENDPOINT}${querys}`);
		return response.data;
	} catch (err) {
		throw new Error('Unexpected error');
	}
}

export async function getOneEpisodeByID(id: string): Promise<EpisodeSchema> {
	try {
		const response = await api.get(`${EPISODE_ENDPOINT}/${id}`);
		return response.data;
	} catch (err) {
		throw new Error('Unexpected error');
	}
}
