export enum FavsTypes {
	characters = 'characters',
	episodes = 'episodes',
	locations = 'locations',
}

export type FavsProviderProps = {
	favCharactersIds: string[],
	favEpisodesIds: string[],
	favLocationsIds: string[],
	addToFavs: (id: string, type: FavsTypes) => void,
	removeFromFavs: (id: string, type: FavsTypes) => void,
	checkIsFav: (id: string, type: FavsTypes) => boolean,
};
