import { InfoPaginationSchema } from '../types';

export interface LocationSchema {
	id: number;
	name: string;
	type: string;
	dimension: string;
	residents: string[];
	url: string;
	crated: string;
}

export interface GetAllLocationsProps {
	info: InfoPaginationSchema;
	results: LocationSchema[];
}

export interface GetAllLocationsFiltersProps {
	name?: string;
	type?: string;
	dimension?: string;
	page?: string;
}
