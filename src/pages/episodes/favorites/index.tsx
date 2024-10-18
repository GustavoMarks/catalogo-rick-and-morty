import { useCallback, useEffect, useState } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/router';

import { ArrowBack } from '@mui/icons-material';
import {
	Alert,
	AlertColor,
	Box,
	CardHeader,
	Grid,
	IconButton,
} from '@mui/material';

import constants from '@/helpers/constants';
import { pageHistoryReturn } from '@/helpers/utils';
import useEpisodes from '@/hooks/useEpisodes';
import useFavs from '@/hooks/useFavs';
import { EpisodeSchema } from '@/services/episodes/types';
import EpisodesBanner from '@/views/episodes/EpisodesBanner';
import EpisodesDataGrid from '@/views/episodes/EpisodesDataGrid';

export default function EpisodesList() {
	const [episodesData, setEpisodesData] = useState<EpisodeSchema[]>();

	const router = useRouter();
	const { favEpisodesIds } = useFavs();

	const { getEpisodesByIDListMutation } = useEpisodes();
	const { isLoading: episodesLoading } = getEpisodesByIDListMutation;

	const handleUpdateEpisodesData = useCallback(async (idsList: string[]) => {
		try {
			const fetchedData = await getEpisodesByIDListMutation.mutateAsync(idsList);
			setEpisodesData(fetchedData);
		} catch (err) {
			setEpisodesData(undefined);
		}
	}, []);

	useEffect(() => {
		handleUpdateEpisodesData(favEpisodesIds);
	}, [favEpisodesIds]);

	return (
		<Grid container spacing={3} mb={3}>
			<Grid sx={{ position: 'relative' }} item sm={12} xs={12}>
				<EpisodesBanner />
			</Grid>

			<Grid item sm={12} xs={12}>
				<CardHeader
					sx={{
						position: 'absolute',
						top: '20px',
					}}
					action={(
						<IconButton
							onClick={() => pageHistoryReturn(router, constants.PATH_EPISODES_PAGE)}
							aria-label='return'
						>
							<ArrowBack />
						</IconButton>
					)}
				/>
				<Alert severity='info' color={'secondary' as AlertColor}>
					<Box sx={{ display: 'flex', alignItems: 'center' }}>
						Your favorites espisodes list.
						<Link
							href={constants.PATH_EPISODES_PAGE}
							style={{ padding: 2 }}
						>
							Click here
						</Link>
						to find others espisodes.
					</Box>
				</Alert>
			</Grid>

			<Grid item sm={12} xs={12}>
				<EpisodesDataGrid
					listaData={episodesData}
					isLoading={episodesLoading}
					pagination={false}
				/>
			</Grid>
		</Grid>
	);
}
