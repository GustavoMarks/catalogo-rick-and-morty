import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './store';
import { useState } from 'react';
import api from './services/api';

// Hooks para chamadas redux pré-tipadas
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// Hook para chamadas a API
export const useApiGet = () => {
	const [data, setData] = useState(null);
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	const [loaded, setLoaded] = useState(false);

	const request = async (params: string) => {
		setLoading(true);
		setLoaded(false);

		try {
			const result = await api.get(params);
			setData(result.data);
			setError('');

		} catch (err) {
			setError('Erro inesperado!');

		} finally {
			setLoading(false);
			setLoaded(true);
		}
	}

	return {
		data,
		error,
		loading,
		loaded,
		request,
	};
}


// Hook para manipulação de local storage
export const useLocalStorageFavorites = () => {
	const storageKey = "rickandmortyfavs";

	const getItems = () => {
		const storedItems = localStorage.getItem(storageKey);
		if (!storedItems) return [];

		try {
			const arrayStorage = [...JSON.parse(storedItems)];
			return arrayStorage;
		} catch {
			return [];
		}
	};

	const setNewItem = (itemId: string) => {
		const storedItems = getItems();
		storedItems.push(itemId);

		localStorage.setItem(storageKey, JSON.stringify(storedItems));
	};

	const removeItem = (itemId: string) => {
		const storedItems = getItems();
		const findedIndex = storedItems.indexOf(String(itemId));

		if (findedIndex !== -1) {
			storedItems.splice(findedIndex, 1);
			const newStored = [...storedItems];
			localStorage.setItem(storageKey, JSON.stringify(newStored));
			return true;
		} else return false;
	};

	return { getItems, setNewItem, removeItem }
}