import { createContext, ReactNode, useEffect, useMemo, useState } from 'react';

import { FavsProviderProps, FavsTypes } from './types';

const defaultProvider: FavsProviderProps = {
	addToFavs: () => null,
	removeFromFavs: () => null,
	checkIsFav: () => false,
	favCharactersIds: [],
	favEpisodesIds: [],
	favLocationsIds: [],
};

const FavsContext = createContext(defaultProvider);

type Props = {
	children: ReactNode;
};

function FavsProvider({ children }: Props) {
	const [favCharactersIds, setFavCharactersIds] = useState<string[]>([]);
	const [favEpisodesIds, setFavEpisodesIds] = useState<string[]>([]);
	const [favLocationsIds, setFavLocationsIds] = useState<string[]>([]);

	const handleLocalStorageSave = (arrayUpdate: string[], type: FavsTypes) => {
		const stringifiedArray = JSON.stringify(arrayUpdate);
		switch (type) {
			case FavsTypes.characters:
				localStorage.setItem(`favs/${FavsTypes.characters}`, stringifiedArray);
				break;
			case FavsTypes.episodes:
				localStorage.setItem(`favs/${FavsTypes.episodes}`, stringifiedArray);
				break;
			case FavsTypes.locations:
				localStorage.setItem(`favs/${FavsTypes.locations}`, stringifiedArray);
				break;
			default:
				break;
		}
	};

	const addToFavs = (id: string, type: FavsTypes) => {
		let arrayUpdate: string[] = [];
		switch (type) {
			case FavsTypes.characters:
				arrayUpdate = [...favCharactersIds, id];
				setFavCharactersIds(arrayUpdate);
				break;
			case FavsTypes.episodes:
				arrayUpdate = [...favEpisodesIds, id];
				setFavEpisodesIds(arrayUpdate);
				break;
			case FavsTypes.locations:
				arrayUpdate = [...favLocationsIds, id];
				setFavLocationsIds(arrayUpdate);
				break;
			default:
				break;
		}
		handleLocalStorageSave(arrayUpdate, type);
	};

	const removeFromFavs = (id: string, type: FavsTypes) => {
		let arrayUpdate: string[] = [];
		switch (type) {
			case FavsTypes.characters:
				arrayUpdate = favCharactersIds.filter((favId) => favId !== id);
				setFavCharactersIds(arrayUpdate);
				break;
			case FavsTypes.episodes:
				arrayUpdate = favEpisodesIds.filter((favId) => favId !== id);
				setFavEpisodesIds(arrayUpdate);
				break;
			case FavsTypes.locations:
				arrayUpdate = favLocationsIds.filter((favId) => favId !== id);
				setFavLocationsIds(arrayUpdate);
				break;
			default:
				break;
		}
		handleLocalStorageSave(arrayUpdate, type);
	};

	const checkIsFav = (id: string, type: FavsTypes) => {
		switch (type) {
			case FavsTypes.characters:
				return favCharactersIds.includes(id);
			case FavsTypes.episodes:
				return favEpisodesIds.includes(id);
			case FavsTypes.locations:
				return favLocationsIds.includes(id);
			default:
				return false;
		}
	};

	const handleLoadFromLocalStorage = () => {
		try {
			const storagedFavCharactersIds = localStorage.getItem(`favs/${FavsTypes.characters}`);
			const storagedFavEpisodesIds = localStorage.getItem(`favs/${FavsTypes.episodes}`);
			const storagedFavLocationsIds = localStorage.getItem(`favs/${FavsTypes.locations}`);

			const parsedFavCharactersIds = storagedFavCharactersIds
				? JSON.parse(storagedFavCharactersIds) : [];
			const parsedFavEpisodesIds = storagedFavEpisodesIds
				? JSON.parse(storagedFavEpisodesIds) : [];
			const parsedFavLocationsIds = storagedFavLocationsIds
				? JSON.parse(storagedFavLocationsIds) : [];

			setFavCharactersIds(parsedFavCharactersIds);
			setFavEpisodesIds(parsedFavEpisodesIds);
			setFavLocationsIds(parsedFavLocationsIds);
		} catch (err) {
			setFavCharactersIds([]);
			setFavEpisodesIds([]);
			setFavLocationsIds([]);
			handleLocalStorageSave([], FavsTypes.characters);
			handleLocalStorageSave([], FavsTypes.episodes);
			handleLocalStorageSave([], FavsTypes.locations);
		}
	};

	useEffect(() => {
		handleLoadFromLocalStorage();
	}, []);

	const values: FavsProviderProps = useMemo(() => ({
		addToFavs,
		removeFromFavs,
		checkIsFav,
		favCharactersIds,
		favEpisodesIds,
		favLocationsIds,
	}), [
		addToFavs,
		removeFromFavs,
		checkIsFav,
		favCharactersIds,
		favEpisodesIds,
		favLocationsIds,
	]);

	return (
		<FavsContext.Provider value={values}>
			{children}
		</FavsContext.Provider>
	);
}

export { FavsContext, FavsProvider };
