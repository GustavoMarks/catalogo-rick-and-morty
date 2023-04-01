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