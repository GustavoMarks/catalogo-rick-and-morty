import { useEffect, useState } from 'react';

import { useRouter } from 'next/router';

import { Box, Divider, Grid, Typography } from '@mui/material';

import ClearFiltersBtn from '@/components/ClearFiltersBtn';
import DebounceInput from '@/components/DebounceInput';
import FilterFavBtn from '@/components/FilterFavBtn';

import { ModuleTypes } from '@/helpers/constants';
import { GetAllCharacterFiltersProps } from '@/services/characters/types';
import { GetAllEpisodesFiltersProps } from '@/services/episodes/types';

const blankFilterValues: GetAllEpisodesFiltersProps = {
	name: undefined,
	episode: undefined,
	page: undefined,
};

interface EpisodesFiltersFormProps {
	filters: GetAllEpisodesFiltersProps;
	onChange: (filters: GetAllEpisodesFiltersProps) => void;
	handleUpdateData: (filters: GetAllEpisodesFiltersProps) => void;
}

export default function EpisodesFiltersForm(props: EpisodesFiltersFormProps) {
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
			if (filters[filterKey as keyof GetAllEpisodesFiltersProps]) {
				queryUpdates[filterKey] = filters[filterKey as keyof GetAllEpisodesFiltersProps];
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
		const querysUpdate: GetAllCharacterFiltersProps = blankFilterValues;
		Object.keys(query).forEach((queryKey) => {
			if (queryKey in querysUpdate && query[queryKey]) {
				querysUpdate[queryKey as keyof GetAllCharacterFiltersProps] =
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
				<Grid item xs={12} sm={5.5}>
					<DebounceInput
						fullWidth
						label='Name'
						placeholder='Pilot'
						color='secondary'
						value={filters.name}
						handleDebounce={(value) => onChange({ ...filters, name: value, page: undefined })}
					/>
				</Grid>
				<Grid item xs={12} sm={5}>
					<DebounceInput
						fullWidth
						label='Episode code'
						placeholder='S01E01'
						color='secondary'
						value={filters.episode}
						handleDebounce={(value) => onChange({ ...filters, episode: value, page: undefined })}
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
						<FilterFavBtn type={ModuleTypes.episodes} />
					</Box>
				</Grid>
			</Grid>
		</form>
	);
}
