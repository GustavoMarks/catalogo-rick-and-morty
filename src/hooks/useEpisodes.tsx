import { useMutation } from 'react-query';

import { getAllEpisodesByFilter, getOneEpisodeByID } from '@/services/episodes';
import { GetAllEpisodesFiltersProps } from '@/services/episodes/types';

const useEpisodes = () => {
	const getAllEpisodesByFiltersMutation = useMutation(
		(filters?: GetAllEpisodesFiltersProps) => getAllEpisodesByFilter(filters));

	const getOneEpisodeByIDMutation = useMutation((id: string) => getOneEpisodeByID(id));
	return {
		getAllEpisodesByFiltersMutation,
		getOneEpisodeByIDMutation,
	};
};

export default useEpisodes;
