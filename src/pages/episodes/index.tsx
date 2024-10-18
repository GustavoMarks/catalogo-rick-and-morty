import { useCallback, useState } from 'react';

import {
	Grid,
} from '@mui/material';

import useEpisodes from '@/hooks/useEpisodes';
import { GetAllEpisodesFiltersProps, GetAllEpisodesProps } from '@/services/episodes/types';
import EpisodesBanner from '@/views/episodes/EpisodesBanner';
import EpisodesDataGrid from '@/views/episodes/EpisodesDataGrid';
import EpisodesFiltersForm from '@/views/episodes/EpisodesFiltersForm';

export default function EpisodesList() {
	const [data, setData] = useState<GetAllEpisodesProps | null>(null);
	const [filters, setFilters] = useState<GetAllEpisodesFiltersProps>({});
	const { getAllEpisodesByFiltersMutation } = useEpisodes();

	const { isLoading } = getAllEpisodesByFiltersMutation;

	const handleUpdateData = useCallback(async (newFilters?: GetAllEpisodesFiltersProps) => {
		try {
			const fetchedData = await getAllEpisodesByFiltersMutation.mutateAsync(newFilters);
			setData(fetchedData);
		} catch (err) {
			setData(null);
		}
	}, [filters]);

	return (
		<Grid container spacing={3} mb={3}>
			<Grid sx={{ position: 'relative' }} item sm={12} xs={12}>
				<EpisodesBanner />
			</Grid>

			<Grid item sm={12}>
				<EpisodesFiltersForm
					filters={filters}
					onChange={setFilters}
					handleUpdateData={handleUpdateData}
				/>
			</Grid>
			<Grid item sm={12} xs={12}>
				<EpisodesDataGrid
					data={data}
					isLoading={isLoading}
					filters={filters}
					onFiltersChange={setFilters}
					pagination
				/>
			</Grid>
		</Grid>
	);
}
