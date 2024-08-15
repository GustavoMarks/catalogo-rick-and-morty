import { useEffect, useState } from 'react';

import { useRouter } from 'next/router';

import { FilterAltOffOutlined } from '@mui/icons-material';
import { Divider, Grid, IconButton, Tooltip, Typography } from '@mui/material';

import DebounceInput from '@/components/DebounceInput';

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
						handleDebounce={(value) => onChange({ ...filters, name: value })}
					/>
				</Grid>
				<Grid item xs={12} sm={5.5}>
					<DebounceInput
						fullWidth
						label='Episode code'
						placeholder='S01E01'
						color='secondary'
						value={filters.episode}
						handleDebounce={(value) => onChange({ ...filters, episode: value })}
					/>
				</Grid>

				<Grid item xs={12} sm={1}>
					<Tooltip title='Clear all filters'>
						<IconButton
							color='secondary'
							onClick={handleClearAllFilter}
						>
							<FilterAltOffOutlined />
						</IconButton>
					</Tooltip>
				</Grid>
			</Grid>
		</form>
	);
}
