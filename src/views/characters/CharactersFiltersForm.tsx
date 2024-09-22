import { useEffect, useState } from 'react';

import { useRouter } from 'next/router';

import { FilterAltOffOutlined } from '@mui/icons-material';
import { Divider, Grid, IconButton, SelectChangeEvent, Tooltip, Typography } from '@mui/material';

import DebounceInput from '@/components/DebounceInput';
import Select from '@/components/Select';

import constants from '@/helpers/constants';
import { GetAllCharacterFiltersProps } from '@/services/characters/types';

const blankFilterValues: GetAllCharacterFiltersProps = {
	name: undefined,
	gender: undefined,
	species: undefined,
	status: undefined,
	type: undefined,
	page: undefined,
};

interface CharactersFiltersFormProps {
	filters: GetAllCharacterFiltersProps;
	onChange: (filters: GetAllCharacterFiltersProps) => void;
	handleUpdateData: (filters: GetAllCharacterFiltersProps) => void;
}

export default function CharactersFiltersForm(props: CharactersFiltersFormProps) {
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
			if (filters[filterKey as keyof GetAllCharacterFiltersProps]) {
				queryUpdates[filterKey] = filters[filterKey as keyof GetAllCharacterFiltersProps];
			} else {
				delete queryUpdates[filterKey];
			}
		});
		router.push({
			query: queryUpdates,
		});
	};

	const handleSelectChange = (
		event: SelectChangeEvent,
		field: keyof GetAllCharacterFiltersProps,
	) => {
		onChange({ ...filters, [field]: event.target.value, page: undefined });
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
				<Grid item xs={12} sm={3}>
					<DebounceInput
						fullWidth
						label='Name'
						placeholder='Rick Sanchez'
						color='secondary'
						value={filters.name}
						handleDebounce={(value) => onChange({ ...filters, name: value, page: undefined })}
					/>
				</Grid>
				<Grid item xs={12} sm={2}>
					<Select
						label='Status'
						options={constants.STATUS_OPTIONS}
						value={filters.status}
						onChange={(event: SelectChangeEvent) => handleSelectChange(event, 'status')}
						noneOption
					/>
				</Grid>
				<Grid item xs={12} sm={2}>
					<Select
						label='Species'
						options={constants.SPECIES_OPTIONS}
						value={filters.species}
						onChange={(event: SelectChangeEvent) => handleSelectChange(event, 'species')}
						noneOption
					/>
				</Grid>
				<Grid item xs={12} sm={2}>
					<DebounceInput
						fullWidth
						label='Type'
						color='secondary'
						value={filters.type}
						handleDebounce={(value) => onChange({ ...filters, type: value, page: undefined })}
					/>
				</Grid>
				<Grid item xs={12} sm={2}>
					<Select
						label='Gender'
						options={constants.GENDER_OPTIONS}
						value={filters.gender}
						onChange={(event: SelectChangeEvent) => handleSelectChange(event, 'gender')}
						noneOption
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
