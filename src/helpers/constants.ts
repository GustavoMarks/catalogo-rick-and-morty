import { SelectOptionProps } from '@/components/Select';

import { CharacterGenders, CharacterSpecies, CharacterStatus } from '@/services/characters/types';

const statusOptions: SelectOptionProps[] = [
	{ value: CharacterStatus.Alive, label: 'Alive' },
	{ value: CharacterStatus.Dead, label: 'Dead' },
	{ value: CharacterStatus.Unknown, label: 'Unknown' },
];

const speciesOptions: SelectOptionProps[] = [
	{ value: CharacterSpecies.Alien, label: 'Alien' },
	{ value: CharacterSpecies.Animal, label: 'Animal' },
	{ value: CharacterSpecies.Cronenberg, label: 'Cronenberg' },
	{ value: CharacterSpecies.Disease, label: 'Disease' },
	{ value: CharacterSpecies.Human, label: 'Human' },
	{ value: CharacterSpecies.Humanoid, label: 'Humanoid' },
	{ value: CharacterSpecies.MythologicalCreature, label: 'Mythological Creature' },
	{ value: CharacterSpecies.Poopybutthole, label: 'Poopybutthole' },
	{ value: CharacterSpecies.Robot, label: 'Robot' },
	{ value: CharacterSpecies.Unknown, label: 'Unknown' },
];

const gendersOptions: SelectOptionProps[] = [
	{ value: CharacterGenders.Female, label: 'Female' },
	{ value: CharacterGenders.Male, label: 'Male' },
	{ value: CharacterGenders.Generless, label: 'Generless' },
	{ value: CharacterGenders.Unknown, label: 'Unknown' },
];

export enum ModuleTypes {
	characters = 'characters',
	episodes = 'episodes',
	locations = 'locations',
}

export default {
	FOOTER_REM_HEIGHT: '5rem',
	APPBAR_REM_HEIGHT: '4rem',
	PATH_CHARACTERS_PAGE: '/characters',
	PATH_EPISODES_PAGE: '/episodes',
	PATH_LOCATIONS_PAGE: '/locations',
	URL_CHARACTERS_CARD_IMG: 'https://rickandmortyapi.com/api/character/avatar/31.jpeg',
	URL_EPISODES_CARD_IMG: 'https://rickandmortyapi.com/api/character/avatar/265.jpeg',
	URL_LOCATIONS_CARD_IMG: 'https://rickandmortyapi.com/api/character/avatar/157.jpeg',
	URL_REPOSITORY: 'https://github.com/GustavoMarks/catalogo-rick-and-morty',
	URL_AUTHOR: 'https://github.com/GustavoMarks/',
	URL_ABOUT_API: 'https://rickandmortyapi.com/about',
	URL_API: 'https://rickandmortyapi.com/api',
	DEBOUNCE_TIME: 1000, // 1s
	STATUS_OPTIONS: statusOptions,
	SPECIES_OPTIONS: speciesOptions,
	GENDER_OPTIONS: gendersOptions,
	QUERY_ID_CHRACTER: 'id_character',
	QUERY_ID_EPISODE: 'id_episode',
	QUERY_ID_LOCATION: 'id_location',
	FORM_SPACING: 2,
} as const;
