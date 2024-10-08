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
import useLocations from '@/hooks/useLocations';
import { CharacterSchema } from '@/services/characters/types';
import { EpisodeSchema } from '@/services/episodes/types';
import { LocationSchema } from '@/services/locations/types';
import CharactersBanner from '@/views/characters/CharactersBanner';
import CharactersDataGrid from '@/views/characters/CharactersDataGrid';

export default function CharacterList() {
	const [charactersData, setCharactersData] = useState<CharacterSchema[]>();
	const [episodeData, setEpisodeData] = useState<EpisodeSchema>();
	const [locationData, setLocationData] = useState<LocationSchema>();
	const [routeLoaded, setRouterLoaded] = useState(false);

	const router = useRouter();

	const { getCharactersByIDListMutation } = useCharacters();
	const { isLoading: charactersLoading } = getCharactersByIDListMutation;

	const { getOneEpisodeByIDMutation } = useEpisodes();
	const { isLoading: episodeLoading } = getOneEpisodeByIDMutation;

	const { getOneLocationByIDMutation } = useLocations();
	const { isLoading: locationLoading } = getOneLocationByIDMutation;

	const handleUpdateCharactersData = useCallback(async (idsList: string[]) => {
		try {
			const fetchedData = await getCharactersByIDListMutation.mutateAsync(idsList);
			setCharactersData(fetchedData);
		} catch (err) {
			setCharactersData(undefined);
		}
	}, []);

	const handleUpdateEpisodeData = useCallback(async (idEpisode: string) => {
		try {
			const fetchedData = await getOneEpisodeByIDMutation.mutateAsync(idEpisode);
			setEpisodeData(fetchedData);
		} catch (err) {
			setEpisodeData(undefined);
		}
	}, []);

	const handleUpdateLocationData = useCallback(async (idLocation: string) => {
		try {
			const findedData = await getOneLocationByIDMutation.mutateAsync(idLocation);
			setLocationData(findedData);
		} catch (err) {
			setLocationData(undefined);
		}
	}, []);

	useEffect(() => {
		if (!router.isReady || routeLoaded) return;
		const {
			ids,
			[constants.QUERY_ID_EPISODE]: idEpisode,
			[constants.QUERY_ID_LOCATION]: idLocation,
		} = router.query;

		const idsList = String(ids).split(',');
		handleUpdateCharactersData(idsList);

		if (idEpisode) handleUpdateEpisodeData(String(idEpisode));
		if (idLocation) handleUpdateLocationData(String(idLocation));
		setRouterLoaded(true);
	}, [
		router.isReady,
		router.query,
	]);

	return (
		<Grid container spacing={3} mb={3}>
			<Grid sx={{ position: 'relative' }} item sm={12} xs={12}>
				<CharactersBanner />
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
					(episodeLoading || !!episodeData) && (
						<Alert severity='info' color={'secondary' as AlertColor}>
							<Box sx={{ display: 'flex', alignItems: 'center' }}>
								Characters in
								{
									episodeLoading ? <Skeleton width={200} /> : (
										<Typography sx={{ fontWeight: 'bold', pr: 1, pl: 1 }}>
											{episodeData?.name}
										</Typography>
									)
								}
								episode.
								<Link
									href={constants.PATH_CHARACTERS_PAGE}
									style={{ padding: 2 }}
								>
									Click here
								</Link>
								to find others characters.
							</Box>
						</Alert>
					)
				}
				{
					(locationLoading || !!locationData) && (
						<Alert severity='info' color={'secondary' as AlertColor}>
							<Box sx={{ display: 'flex', alignItems: 'center' }}>
								Residents in
								{
									locationLoading ? <Skeleton width={200} /> : (
										<Typography sx={{ fontWeight: 'bold', pr: 1, pl: 1 }}>
											{`${locationData?.name}`}
										</Typography>
									)
								}
								.
								<Link
									href={constants.PATH_CHARACTERS_PAGE}
									style={{ padding: 2 }}
								>
									Click here
								</Link>
								to find others characters.
							</Box>
						</Alert>
					)
				}
			</Grid>

			<Grid item sm={12} xs={12}>
				<CharactersDataGrid
					listaData={charactersData}
					isLoading={charactersLoading}
					pagination={false}
				/>
			</Grid>
		</Grid>
	);
}
