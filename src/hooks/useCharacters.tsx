import { useMutation } from 'react-query';

import { getAllCharactersByFilter, getOneCharacterByID, getCharactersByIDList } from '@/services/characters';
import { GetAllCharacterFiltersProps } from '@/services/characters/types';

const useCharacters = () => {
	const getAllCharactersByFiltersMutation = useMutation(
		(filters?: GetAllCharacterFiltersProps) => getAllCharactersByFilter(filters));

	const getCharactersByIDListMutation = useMutation(
		(idList: string[]) => getCharactersByIDList(idList));

	const getOneCharacterByIDMutation = useMutation((id: string) => getOneCharacterByID(id));
	return {
		getAllCharactersByFiltersMutation,
		getCharactersByIDListMutation,
		getOneCharacterByIDMutation,
	};
};

export default useCharacters;
