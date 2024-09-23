import { useCallback, useEffect, useMemo, useState } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/router';

import {
	ArrowBack,
	DoorFrontOutlined,
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
	Grid,
	IconButton,
	useMediaQuery,
} from '@mui/material';

import Banner from '@/components/Banner';
import InfoBox from '@/components/InfoBox';

import constants from '@/helpers/constants';
import { getPathCharactersListFromLocation, pageHistoryReturn } from '@/helpers/utils';
import useLocations from '@/hooks/useLocations';
import { LocationSchema } from '@/services/locations/types';

export default function LocationDetailsPage() {
	const [data, setData] = useState<LocationSchema | null>(null);
	const [routerLoaded, setRouterLoaded] = useState(false);
	const { getOneLocationByIDMutation } = useLocations();

	const { isLoading } = getOneLocationByIDMutation;
	const router = useRouter();
	const layoutMatches = useMediaQuery('(min-width:600px)');

	const handleUpdateData = useCallback(async (id: string) => {
		try {
			const fetchedData = await getOneLocationByIDMutation.mutateAsync(id);
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
		if (getOneLocationByIDMutation.isError) {
			router.push('/404');
		}
	}, [getOneLocationByIDMutation.isError]);

	const charactersListPath = useMemo(() => getPathCharactersListFromLocation(data), [data]);

	return (
		<Grid container mb={3}>
			<Grid sx={{ position: 'relative' }} item sm={12} xs={12}>
				<Banner
					loading={isLoading}
					subtitle='Location page'
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
									title='Location type'
									description={data?.type}
									icon={<Tag />}
									loading={isLoading}
								/>
							</Grid>
							<Grid item md={2.5} sm={12} xs={12}>
								<InfoBox
									title='Dimension'
									description={data?.dimension}
									icon={<DoorFrontOutlined />}
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
									href={constants.PATH_LOCATIONS_PAGE}
								>
									Locations list
								</Button>
								<Button
									startIcon={<ListAltOutlined />}
									LinkComponent={Link}
									href={charactersListPath}
									disabled={isLoading}
								>
									Residents in this location
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
