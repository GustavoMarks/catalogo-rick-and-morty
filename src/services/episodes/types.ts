import { InfoPaginationSchema } from '../types';

export interface EpisodeSchema {
	id: number;
	name: string;
	air_date: string;
	episode: string;
	characters: string[];
	url: string;
	crated: string;
}

export interface GetAllEpisodesProps {
	info: InfoPaginationSchema;
	results: EpisodeSchema[];
}

export interface GetAllEpisodesFiltersProps {
	name?: string;
	episode?: string;
	page?: string;
}
