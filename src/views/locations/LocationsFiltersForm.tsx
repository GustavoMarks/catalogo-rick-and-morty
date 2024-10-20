import { useEffect, useState } from 'react';

import { useRouter } from 'next/router';

import { Box, Divider, Grid, Typography } from '@mui/material';

import ClearFiltersBtn from '@/components/ClearFiltersBtn';
import DebounceInput from '@/components/DebounceInput';
import FilterFavBtn from '@/components/FilterFavBtn';

import { ModuleTypes } from '@/helpers/constants';
import { GetAllLocationsFiltersProps } from '@/services/locations/types';

const blankFilterValues: GetAllLocationsFiltersProps = {
	name: undefined,
	type: undefined,
	dimension: undefined,
	page: undefined,
};

interface LocationsFiltersFormProps {
	filters: GetAllLocationsFiltersProps;
	onChange: (filters: GetAllLocationsFiltersProps) => void;
	handleUpdateData: (filters: GetAllLocationsFiltersProps) => void;
}

export default function LocationsFiltersForm(props: LocationsFiltersFormProps) {
	const { filters, onChange, handleUpdateData } = props;

	const [routerQueryLoaded, setRouterQueryLoaded] = useState(false);
	const router = useRouter();

	const handleQueryUpdate = () => {
		const { query } = router;
		const queryUpdates = { ...query };

		let updateTarget = filters;
		if (Object.keys(filters).length === 0) {
			updateTarget = blankFilterValues;
		}

		Object.keys(updateTarget).forEach((filterKey) => {
			if (filters[filterKey as keyof GetAllLocationsFiltersProps]) {
				queryUpdates[filterKey] = filters[filterKey as keyof GetAllLocationsFiltersProps];
			} else {
				delete queryUpdates[filterKey];
			}
		});

		router.push({
			query: queryUpdates,
		});
	};

	const handleClearAllFilter = () => {
		onChange({});
	};

	useEffect(() => {
		if (!router.isReady || routerQueryLoaded) return;

		const { query } = router;
		const querysUpdate: GetAllLocationsFiltersProps = blankFilterValues;
		Object.keys(query).forEach((queryKey) => {
			if (queryKey in querysUpdate && query[queryKey]) {
				querysUpdate[queryKey as keyof GetAllLocationsFiltersProps] =
					query[queryKey] as unknown as undefined;
			}
		});

		onChange(querysUpdate);
		handleUpdateData(querysUpdate);
		setRouterQueryLoaded(true);
	}, [
		router.isReady,
	]);

	useEffect(() => {
		if (!routerQueryLoaded) return;

		handleUpdateData(filters);
		handleQueryUpdate();
	}, [filters]);
	return (
		<form>
			<Grid container spacing={3}>
				<Grid item xs={12}>
					<Typography
						variant='h6'
					>
						Filters
					</Typography>
					<Divider />
				</Grid>
				<Grid item xs={12} sm={4}>
					<DebounceInput
						fullWidth
						label='Name'
						placeholder='Earth (C-137)'
						color='secondary'
						value={filters.name}
						handleDebounce={(value) => onChange({ ...filters, name: value, page: undefined })}
					/>
				</Grid>
				<Grid item xs={12} sm={3}>
					<DebounceInput
						fullWidth
						label='Location type'
						placeholder='Planet'
						color='secondary'
						value={filters.type}
						handleDebounce={(value) => onChange({ ...filters, type: value, page: undefined })}
					/>
				</Grid>

				<Grid item xs={12} sm={3.5}>
					<DebounceInput
						fullWidth
						label='Dimension'
						placeholder='Dimension C-137'
						color='secondary'
						value={filters.dimension}
						handleDebounce={(value) => onChange({ ...filters, dimension: value, page: undefined })}
					/>
				</Grid>

				<Grid item xs={12} sm={1.5}>
					<Box
						sx={{
							display: 'flex',
							justifyContent: 'space-between',
							alignItems: 'center',
							height: '100%',
						}}
					>
						<ClearFiltersBtn onClick={handleClearAllFilter} />
						<FilterFavBtn type={ModuleTypes.locations} />
					</Box>
				</Grid>
			</Grid>
		</form>
	);
}
