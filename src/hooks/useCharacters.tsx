import { useMutation } from 'react-query';

import { getAllCharactersByFilter, getOneCharacterByID } from '@/services/characters';
import { GetAllCharacterFiltersProps } from '@/services/characters/types';

const useCharacters = () => {
	const getAllCharactersByFiltersMutation = useMutation(
		(filters?: GetAllCharacterFiltersProps) => getAllCharactersByFilter(filters));

	const getOneCharacterByIDMutation = useMutation((id: string) => getOneCharacterByID(id));
	return {
		getAllCharactersByFiltersMutation,
		getOneCharacterByIDMutation,
	};
};

export default useCharacters;
