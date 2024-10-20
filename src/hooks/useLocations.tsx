import { useMutation } from 'react-query';

import { getAllLocationsByFilter, getLocationsByIDList, getOneLocationByID } from '@/services/locations';
import { GetAllLocationsFiltersProps } from '@/services/locations/types';

const useLocations = () => {
	const getAllLocationsByFiltersMutation = useMutation(
		(filters?: GetAllLocationsFiltersProps) => getAllLocationsByFilter(filters));

	const getLocationsByIDListMutation = useMutation(
		(idList: string[]) => getLocationsByIDList(idList));

	const getOneLocationByIDMutation = useMutation((id: string) => getOneLocationByID(id));
	return {
		getAllLocationsByFiltersMutation,
		getLocationsByIDListMutation,
		getOneLocationByIDMutation,
	};
};

export default useLocations;
