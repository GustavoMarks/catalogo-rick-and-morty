import { InfoPaginationSchema } from '../types';

export enum CharacterStatus {
	Alive = 'alive',
	Dead = 'dead',
	Unknown = 'unknown',
}

export enum CharacterGenders {
	Female = 'female',
	Male = 'male',
	Generless = 'generless',
	Unknown = 'unknown',
}

export enum CharacterSpecies {
	Human = 'human',
	Alien = 'alien',
	Humanoid = 'humanoid',
	Unknown = 'unknown',
	Poopybutthole = 'poopybutthole',
	MythologicalCreature = 'mythological creature',
	Animal = 'animal',
	Robot = 'robot',
	Cronenberg = 'cronenberg',
	Disease = 'disease',
}

interface ChactacterOriginSchema {
	name: string;
	url: string;
}

export interface CharacterSchema {
	id: number;
	name: string;
	status: CharacterStatus;
	species: CharacterSpecies;
	type: string;
	gender: CharacterGenders;
	origin: ChactacterOriginSchema;
	location: ChactacterOriginSchema;
	image: string;
	episode: string[];
	url: string;
	created: string;
}

export interface GetAllCharacterProps {
	info: InfoPaginationSchema;
	results: CharacterSchema[];
}

export interface GetAllCharacterFiltersProps {
	name?: string;
	status?: CharacterStatus;
	species?: string;
	type?: string;
	gender?: CharacterGenders;
	page?: string;
}
