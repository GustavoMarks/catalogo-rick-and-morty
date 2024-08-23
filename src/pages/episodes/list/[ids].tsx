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
	Skeleton,
	Typography,
} from '@mui/material';

import constants from '@/helpers/constants';
import { pageHistoryReturn } from '@/helpers/utils';
import useCharacters from '@/hooks/useCharacters';
import useEpisodes from '@/hooks/useEpisodes';
import { CharacterSchema } from '@/services/characters/types';
import { EpisodeSchema } from '@/services/episodes/types';
import EpisodesBanner from '@/views/episodes/EpisodesBanner';
import EpisodesDataGrid from '@/views/episodes/EpisodesDataGrid';

export default function EpisodesList() {
	const [episodesData, setEpisodesData] = useState<EpisodeSchema[]>();
	const [characterData, setCharacterData] = useState<CharacterSchema>();
	const [routeLoaded, setRouterLoaded] = useState(false);

	const router = useRouter();

	const { getEpisodesByIDListMutation } = useEpisodes();
	const { isLoading: episodesLoading } = getEpisodesByIDListMutation;

	const { getOneCharacterByIDMutation } = useCharacters();
	const { isLoading: characterLoading } = getOneCharacterByIDMutation;

	const handleUpdateEpisodesData = useCallback(async (idsList: string[]) => {
		try {
			const fetchedData = await getEpisodesByIDListMutation.mutateAsync(idsList);
			setEpisodesData(fetchedData);
		} catch (err) {
			setEpisodesData(undefined);
		}
	}, []);

	const handleUpdateCharacterData = useCallback(async (idCharacter: string) => {
		try {
			const fetchedData = await getOneCharacterByIDMutation.mutateAsync(idCharacter);
			setCharacterData(fetchedData);
		} catch (err) {
			setCharacterData(undefined);
		}
	}, []);

	useEffect(() => {
		if (!router.isReady || routeLoaded) return;
		const {
			ids,
			id_character: idCharacter,
		} = router.query;

		const idsList = String(ids).split(',');
		handleUpdateEpisodesData(idsList);

		if (idCharacter) handleUpdateCharacterData(String(idCharacter));
		setRouterLoaded(true);
	}, [
		router.isReady,
		router.query,
	]);

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
				{
					(characterLoading || !!characterData) && (
						<Alert severity='info' color={'secondary' as AlertColor}>
							<Box sx={{ display: 'flex', alignItems: 'center' }}>
								{
									characterLoading ? <Skeleton width={200} /> : (
										<Typography sx={{ fontWeight: 'bold' }}>
											{characterData?.name}
										</Typography>
									)
								}
								&apos;
								s list of episodes.
								<Link
									href={constants.PATH_EPISODES_PAGE}
									style={{ padding: 2 }}
								>
									Click here
								</Link>
								to find others episodes.
							</Box>
						</Alert>
					)
				}
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
