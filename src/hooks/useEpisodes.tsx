import { useMutation } from 'react-query';

import { getAllEpisodesByFilter, getOneEpisodeByID, getEpisodesByIDList } from '@/services/episodes';
import { GetAllEpisodesFiltersProps } from '@/services/episodes/types';

const useEpisodes = () => {
	const getAllEpisodesByFiltersMutation = useMutation(
		(filters?: GetAllEpisodesFiltersProps) => getAllEpisodesByFilter(filters));

	const getEpisodesByIDListMutation = useMutation(
		(idList: string[]) => getEpisodesByIDList(idList));

	const getOneEpisodeByIDMutation = useMutation((id: string) => getOneEpisodeByID(id));
	return {
		getAllEpisodesByFiltersMutation,
		getEpisodesByIDListMutation,
		getOneEpisodeByIDMutation,
	};
};

export default useEpisodes;
