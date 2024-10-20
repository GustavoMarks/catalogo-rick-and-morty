import { ModuleTypes } from '@/helpers/constants';

export type FavsProviderProps = {
	favCharactersIds: string[],
	favEpisodesIds: string[],
	favLocationsIds: string[],
	addToFavs: (id: string, type: ModuleTypes) => void,
	removeFromFavs: (id: string, type: ModuleTypes) => void,
	checkIsFav: (id: string, type: ModuleTypes) => boolean,
};
