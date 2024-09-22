import { useCallback, useState } from 'react';

import {
	Grid,
} from '@mui/material';

import useLocations from '@/hooks/useLocations';
import { GetAllLocationsFiltersProps, GetAllLocationsProps } from '@/services/locations/types';
import LocationsBanner from '@/views/locations/LocationsBanner';
import LocationsDataGrid from '@/views/locations/LocationsDataGrid';
import LocationsFiltersForm from '@/views/locations/LocationsFiltersForm';

export default function LocationsList() {
	const [data, setData] = useState<GetAllLocationsProps | null>(null);
	const [filters, setFilters] = useState<GetAllLocationsFiltersProps>({});
	const { getAllLocationsByFiltersMutation } = useLocations();

	const { isLoading } = getAllLocationsByFiltersMutation;

	const handleUpdateData = useCallback(async (newFilters?: GetAllLocationsFiltersProps) => {
		try {
			const fetchedData = await getAllLocationsByFiltersMutation.mutateAsync(newFilters);
			setData(fetchedData);
		} catch (err) {
			setData(null);
		}
	}, [filters]);

	return (
		<Grid container spacing={3} mb={3}>
			<Grid sx={{ position: 'relative' }} item sm={12} xs={12}>
				<LocationsBanner />
			</Grid>

			<Grid item sm={12}>
				<LocationsFiltersForm
					filters={filters}
					onChange={setFilters}
					handleUpdateData={handleUpdateData}
				/>
			</Grid>
			<Grid item sm={12} xs={12}>
				<LocationsDataGrid
					data={data}
					isLoading={isLoading}
					filters={filters}
					onFiltersChange={setFilters}
				/>
			</Grid>
		</Grid>
	);
}
