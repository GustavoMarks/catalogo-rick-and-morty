import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store'; // Importação circular será resolvida

// Controla as alterações no estado global que guarda uma página com lista de itens buscada na API
interface PageState {
	info: {
		count: number,
		pages: number,
	} | null,
	results: [{
		id: number,
		name: string,
		status: string,
		type: string,
		gender: string,
		origin: {
			name: string,
		},
		location: {
			name: string,
		},
		image: string,
	}] | null
};

const initialState: PageState = {
	info: null,
	results: null
};

export const pageSlice = createSlice({
	name: 'page',
	initialState,
	reducers: {
		update: (state, action: PayloadAction<PageState>) => state = action.payload
	}
});

export const { update } = pageSlice.actions;
export const selectPage = (state: RootState) => state.page;
export default pageSlice.reducer;