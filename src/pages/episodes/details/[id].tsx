import { useCallback, useEffect, useMemo, useState } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/router';

import {
	ArrowBack,
	CalendarMonth,
	ListAltOutlined,
	Tag,
} from '@mui/icons-material';
import {
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
import { getPathCharachtersListForEpisode, pageHistoryReturn } from '@/helpers/utils';
import useEpisodes from '@/hooks/useEpisodes';
import useFavs from '@/hooks/useFavs';
import { EpisodeSchema } from '@/services/episodes/types';

export default function EpisodeDetailsPage() {
	const [data, setData] = useState<EpisodeSchema | null>(null);
	const [routerLoaded, setRouterLoaded] = useState(false);
	const { getOneEpisodeByIDMutation } = useEpisodes();

	const { isLoading } = getOneEpisodeByIDMutation;
	const router = useRouter();
	const layoutMatches = useMediaQuery('(min-width:600px)');

	const { addToFavs, removeFromFavs, checkIsFav } = useFavs();
	const isFav = data?.id ? checkIsFav(String(data.id), ModuleTypes.episodes) : false;

	const handleUpdateData = useCallback(async (id: string) => {
		try {
			const fetchedData = await getOneEpisodeByIDMutation.mutateAsync(id);
			setData(fetchedData);
		} catch (err) {
			setData(null);
		}
	}, []);

	const handleToggleFav = () => {
		if (!data?.id) return;
		const targetId = String(data.id);
		if (isFav) {
			removeFromFavs(targetId, ModuleTypes.episodes);
		} else {
			addToFavs(targetId, ModuleTypes.episodes);
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
		if (getOneEpisodeByIDMutation.isError) {
			router.push('/404');
		}
	}, [getOneEpisodeByIDMutation.isError]);

	const charactersListPath = useMemo(() => getPathCharachtersListForEpisode(data), [data]);

	return (
		<Grid container mb={3}>
			<Grid sx={{ position: 'relative' }} item sm={12} xs={12}>
				<Banner
					loading={isLoading}
					subtitle='Episode page'
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
								onClick={() => pageHistoryReturn(router, constants.PATH_EPISODES_PAGE)}
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
							<Grid item md={2.5} sm={12} xs={12}>
								<InfoBox
									title='Air Date'
									description={data?.air_date}
									icon={<CalendarMonth />}
									loading={isLoading}
								/>
							</Grid>
							<Grid item md={1.5} sm={12} xs={12}>
								<InfoBox
									title='Episode code'
									description={data?.episode}
									icon={<Tag />}
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
									href={constants.PATH_EPISODES_PAGE}
								>
									Episodes list
								</Button>
								<Button
									startIcon={<ListAltOutlined />}
									LinkComponent={Link}
									href={charactersListPath}
									disabled={isLoading}
								>
									Characters in this episode
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
