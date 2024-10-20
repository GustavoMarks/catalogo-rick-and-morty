import { createContext, ReactNode, useEffect, useMemo, useState } from 'react';

import { FavsProviderProps } from './types';
import { ModuleTypes } from '@/helpers/constants';

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

	const handleLocalStorageSave = (arrayUpdate: string[], type: ModuleTypes) => {
		const stringifiedArray = JSON.stringify(arrayUpdate);
		switch (type) {
			case ModuleTypes.characters:
				localStorage.setItem(`favs/${ModuleTypes.characters}`, stringifiedArray);
				break;
			case ModuleTypes.episodes:
				localStorage.setItem(`favs/${ModuleTypes.episodes}`, stringifiedArray);
				break;
			case ModuleTypes.locations:
				localStorage.setItem(`favs/${ModuleTypes.locations}`, stringifiedArray);
				break;
			default:
				break;
		}
	};

	const addToFavs = (id: string, type: ModuleTypes) => {
		let arrayUpdate: string[] = [];
		switch (type) {
			case ModuleTypes.characters:
				arrayUpdate = [...favCharactersIds, id];
				setFavCharactersIds(arrayUpdate);
				break;
			case ModuleTypes.episodes:
				arrayUpdate = [...favEpisodesIds, id];
				setFavEpisodesIds(arrayUpdate);
				break;
			case ModuleTypes.locations:
				arrayUpdate = [...favLocationsIds, id];
				setFavLocationsIds(arrayUpdate);
				break;
			default:
				break;
		}
		handleLocalStorageSave(arrayUpdate, type);
	};

	const removeFromFavs = (id: string, type: ModuleTypes) => {
		let arrayUpdate: string[] = [];
		switch (type) {
			case ModuleTypes.characters:
				arrayUpdate = favCharactersIds.filter((favId) => favId !== id);
				setFavCharactersIds(arrayUpdate);
				break;
			case ModuleTypes.episodes:
				arrayUpdate = favEpisodesIds.filter((favId) => favId !== id);
				setFavEpisodesIds(arrayUpdate);
				break;
			case ModuleTypes.locations:
				arrayUpdate = favLocationsIds.filter((favId) => favId !== id);
				setFavLocationsIds(arrayUpdate);
				break;
			default:
				break;
		}
		handleLocalStorageSave(arrayUpdate, type);
	};

	const checkIsFav = (id: string, type: ModuleTypes) => {
		switch (type) {
			case ModuleTypes.characters:
				return favCharactersIds.includes(id);
			case ModuleTypes.episodes:
				return favEpisodesIds.includes(id);
			case ModuleTypes.locations:
				return favLocationsIds.includes(id);
			default:
				return false;
		}
	};

	const handleLoadFromLocalStorage = () => {
		try {
			const storagedFavCharactersIds = localStorage.getItem(`favs/${ModuleTypes.characters}`);
			const storagedFavEpisodesIds = localStorage.getItem(`favs/${ModuleTypes.episodes}`);
			const storagedFavLocationsIds = localStorage.getItem(`favs/${ModuleTypes.locations}`);

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
			handleLocalStorageSave([], ModuleTypes.characters);
			handleLocalStorageSave([], ModuleTypes.episodes);
			handleLocalStorageSave([], ModuleTypes.locations);
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
