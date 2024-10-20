import { useCallback, useEffect, useMemo, useState } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/router';

import {
	ArrowBack,
	BiotechOutlined,
	FingerprintOutlined,
	GpsFixed,
	ListAltOutlined,
	PersonPinCircleOutlined,
	QueryStatsOutlined,
	TransgenderOutlined,
} from '@mui/icons-material';
import {
	Box,
	Button,
	ButtonGroup,
	Card,
	CardActions,
	CardContent,
	CardHeader,
	Grid,
	IconButton,
	useMediaQuery,
} from '@mui/material';

import Banner from '@/components/Banner';
import FavButton from '@/components/FavButton';
import InfoBox from '@/components/InfoBox';

import constants, { ModuleTypes } from '@/helpers/constants';
import { getPathEpisodesListForCharacter, pageHistoryReturn } from '@/helpers/utils';
import useCharacters from '@/hooks/useCharacters';
import useFavs from '@/hooks/useFavs';
import { CharacterSchema } from '@/services/characters/types';

export default function CharacterDetailsPage() {
	const [data, setData] = useState<CharacterSchema | null>(null);
	const [routerLoaded, setRouterLoaded] = useState(false);
	const { getOneCharacterByIDMutation } = useCharacters();

	const { isLoading } = getOneCharacterByIDMutation;
	const router = useRouter();
	const layoutMatches = useMediaQuery('(min-width:600px)');

	const { addToFavs, removeFromFavs, checkIsFav } = useFavs();
	const isFav = data?.id ? checkIsFav(String(data.id), ModuleTypes.characters) : false;

	const handleUpdateData = useCallback(async (id: string) => {
		try {
			const fetchedData = await getOneCharacterByIDMutation.mutateAsync(id);
			setData(fetchedData);
		} catch (err) {
			setData(null);
		}
	}, []);

	const handleToggleFav = () => {
		if (!data?.id) return;
		const targetId = String(data.id);
		if (isFav) {
			removeFromFavs(targetId, ModuleTypes.characters);
		} else {
			addToFavs(targetId, ModuleTypes.characters);
		}
	};

	useEffect(() => {
		if (!router.isReady || routerLoaded) return;
		const { id } = router.query;
		if (id) {
			handleUpdateData(id as string);
		}
		setRouterLoaded(true);
	}, [router.isReady]);

	useEffect(() => {
		if (getOneCharacterByIDMutation.isError) {
			router.push('/404');
		}
	}, [getOneCharacterByIDMutation.isError]);

	const episodesListPath = useMemo(() => getPathEpisodesListForCharacter(data), [data]);

	return (
		<Grid container mb={3}>
			<Grid sx={{ position: 'relative' }} item sm={12} xs={12}>
				<Banner
					loading={isLoading}
					subtitle='Character page'
					title={data?.name || ''}
				/>
			</Grid>
			<Grid item sm={12}>
				<Card>
					<CardHeader
						sx={{
							position: 'absolute',
							top: '20px',
						}}
						action={(
							<IconButton
								onClick={() => pageHistoryReturn(router, constants.PATH_CHARACTERS_PAGE)}
								aria-label='return'
							>
								<ArrowBack />
							</IconButton>
						)}
					/>
					<CardContent>
						<Grid
							container
							spacing={2}
							sx={{
								mt: { xs: '200px', md: '0px', sm: '0px' },
							}}
						>
							<Grid item md={1.5} sm={12} xs={12}>
								<InfoBox
									title='Status'
									description={data?.status}
									icon={<QueryStatsOutlined />}
									loading={isLoading}
								/>
							</Grid>
							<Grid item md={1.5} sm={12} xs={12}>
								<InfoBox
									title='Species'
									description={data?.species}
									icon={<BiotechOutlined />}
									loading={isLoading}
								/>
							</Grid>
							<Grid item md={1.5} sm={12} xs={12}>
								<InfoBox
									title='Gender'
									description={data?.gender}
									icon={<TransgenderOutlined />}
									loading={isLoading}
								/>
							</Grid>
							<Grid item md={2.5} sm={12} xs={12}>
								<InfoBox
									title='Type'
									description={data?.type}
									icon={<FingerprintOutlined />}
									loading={isLoading}
								/>
							</Grid>
							<Grid item sm={3} xs={12} md={12}>
								<Box
									sx={{
										position: 'absolute',
										right: '60px',
										top: '220px',
										width: '300px',
									}}
								>
									<img width='300px' src={data?.image} alt={data?.name} />
								</Box>
							</Grid>
							<Grid item md={4.5} sm={12} xs={12}>
								<InfoBox
									title='Origin'
									description={data?.origin?.name}
									icon={<PersonPinCircleOutlined />}
									loading={isLoading}
								/>
							</Grid>
							<Grid item md={6} sm={12} xs={12}>
								<InfoBox
									title='Location'
									description={data?.location?.name}
									icon={<GpsFixed />}
									loading={isLoading}
								/>
							</Grid>
						</Grid>
						<CardActions sx={{ mt: 6 }}>
							<ButtonGroup
								fullWidth={!layoutMatches}
								variant='outlined'
								color='secondary'
								orientation={layoutMatches ? 'horizontal' : 'vertical'}
							>
								<Button
									startIcon={<ArrowBack />}
									LinkComponent={Link}
									href={constants.PATH_CHARACTERS_PAGE}
								>
									Character list
								</Button>
								<Button
									startIcon={<ListAltOutlined />}
									LinkComponent={Link}
									href={episodesListPath}
								>
									Episodes with this Character
								</Button>
								<FavButton
									isFav={isFav}
									onClick={handleToggleFav}
								/>
							</ButtonGroup>

						</CardActions>
					</CardContent>
				</Card>
			</Grid>
			<Grid item sm={12} />

		</Grid>
	);
}
