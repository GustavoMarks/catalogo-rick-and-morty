import { useCallback, useEffect, useMemo, useState } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/router';

import {
	ArrowBack,
	CalendarMonth,
	FavoriteOutlined,
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
	CardMedia,
	Grid,
	IconButton,
	Skeleton,
	Typography,
	useMediaQuery,
} from '@mui/material';

import InfoBox from '@/components/InfoBox';

import constants from '@/helpers/constants';
import { getPathCharachtersListForEpisode, pageHistoryReturn } from '@/helpers/utils';
import useEpisodes from '@/hooks/useEpisodes';
import { EpisodeSchema } from '@/services/episodes/types';

export default function EpisodeDetailsPage() {
	const [data, setData] = useState<EpisodeSchema | null>(null);
	const [routerLoaded, setRouterLoaded] = useState(false);
	const { getOneEpisodeByIDMutation } = useEpisodes();

	const { isLoading } = getOneEpisodeByIDMutation;
	const router = useRouter();
	const layoutMatches = useMediaQuery('(min-width:600px)');

	const handleUpdateData = useCallback(async (id: string) => {
		try {
			const fetchedData = await getOneEpisodeByIDMutation.mutateAsync(id);
			setData(fetchedData);
		} catch (err) {
			setData(null);
		}
	}, []);

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
							{
								isLoading ? <Skeleton width={500} /> : data?.name
							}
						</Typography>
						<Typography
							variant='h6'
							sx={{
								zIndex: (theme) => theme.zIndex.modal,
								textShadow: '0 0 8px #000',
							}}
						>
							Episode page
						</Typography>
					</CardContent>
				</Card>
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
								<Button
									endIcon={<FavoriteOutlined />}
									disabled
								>
									Favorite
								</Button>
							</ButtonGroup>

						</CardActions>
					</CardContent>
				</Card>
			</Grid>
			<Grid item sm={12} />
		</Grid>
	);
}
