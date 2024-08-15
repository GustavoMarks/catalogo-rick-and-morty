import { useCallback, useState } from 'react';

import {
	Card,
	CardContent,
	CardMedia,
	Grid,
	Typography,
} from '@mui/material';

import EpisodesBannerIllustration from '@/components/illustrations/EpisodesBannerIllustration';

import useEpisodes from '@/hooks/useEpisodes';
import { GetAllEpisodesFiltersProps, GetAllEpisodesProps } from '@/services/episodes/types';
import EpisodesDataGrid from '@/views/episodes/EpisodesDataGrid';
import EpisodesFiltersForm from '@/views/episodes/EpisodesFiltersForm';

export default function CharactersList() {
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
				<Card
					sx={{
						height: '300px',
						position: 'relative',
					}}
				>
					<CardMedia
						image='/images/home-background.webp'
						title='green portal'
						sx={{
							height: '100%',
							width: '100%',
							position: 'absolute',
							top: 0,
							right: 0,
						}}

					/>
					<CardContent
						sx={{
							display: 'flex',
							flexDirection: 'column',
							justifyContent: 'center',
							position: 'relative',
							height: '100%',
							backgroundColor: 'rgba(0,0,0,.6)',
						}}
					>
						<Typography
							variant='h3'
							sx={{
								fontWeight: '800',
								zIndex: (theme) => theme.zIndex.modal,
								textShadow: '0 0 8px #000',
							}}
						>
							List of Episodes
						</Typography>
						<Typography
							variant='h6'
							sx={{
								zIndex: (theme) => theme.zIndex.modal,
								textShadow: '0 0 8px #000',
							}}
						>
							Rick and Morty Catalog
						</Typography>
					</CardContent>
					<EpisodesBannerIllustration />
				</Card>
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
				/>
			</Grid>
		</Grid>
	);
}
