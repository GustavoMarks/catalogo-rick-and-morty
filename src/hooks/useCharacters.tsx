import { useMutation } from 'react-query';

import { getAllChachersByFilter } from '@/services/characters';
import { GetAllCharacterFiltersProps } from '@/services/characters/types';

const useCharacters = () => {
	const getAllChachersByFilterMutation = useMutation(
		(filters?: GetAllCharacterFiltersProps) => getAllChachersByFilter(filters));
	return {
		getAllChachersByFilterMutation,
	};
};

export default useCharacters;
