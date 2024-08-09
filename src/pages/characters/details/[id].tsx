import { useCallback, useEffect, useState } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/router';

import {
	ArrowBack,
	BiotechOutlined,
	FavoriteOutlined,
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
	CardMedia,
	Grid,
	IconButton,
	Skeleton,
	Typography,
	useMediaQuery,
} from '@mui/material';

import InfoBox from '@/components/InfoBox';

import constants from '@/helpers/constants';
import { pageHistoryReturn } from '@/helpers/utils';
import useCharacters from '@/hooks/useCharacters';
import { CharacterSchema } from '@/services/characters/types';

export default function CharactersList() {
	const [data, setData] = useState<CharacterSchema | null>(null);
	const [routerLoaded, setRouterLoaded] = useState(false);
	const { getOneCharacterByIDMutation } = useCharacters();

	const { isLoading } = getOneCharacterByIDMutation;
	const router = useRouter();
	const layoutMatches = useMediaQuery('(min-width:600px)');

	const handleUpdateData = useCallback(async (id: string) => {
		try {
			const fetchedData = await getOneCharacterByIDMutation.mutateAsync(id);
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
		if (getOneCharacterByIDMutation.isError) {
			router.push('/404');
		}
	}, [getOneCharacterByIDMutation.isError]);

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
							Character page
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
									disabled
								>
									Episodes list
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
