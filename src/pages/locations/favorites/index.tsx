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
import useFavs from '@/hooks/useFavs';
import useLocations from '@/hooks/useLocations';
import { LocationSchema } from '@/services/locations/types';
import LocationsBanner from '@/views/locations/LocationsBanner';
import LocationsDataGrid from '@/views/locations/LocationsDataGrid';

export default function LocationsList() {
	const [locationsData, setLocationsData] = useState<LocationSchema[]>();

	const { favLocationsIds } = useFavs();
	const router = useRouter();

	const { getLocationsByIDListMutation } = useLocations();
	const { isLoading: episodesLoading } = getLocationsByIDListMutation;

	const handleUpdateLocationsData = useCallback(async (idsList: string[]) => {
		try {
			const fetchedData = await getLocationsByIDListMutation.mutateAsync(idsList);
			setLocationsData(fetchedData);
		} catch (err) {
			setLocationsData(undefined);
		}
	}, []);

	useEffect(() => {
		handleUpdateLocationsData(favLocationsIds);
	}, [favLocationsIds]);

	return (
		<Grid container spacing={3} mb={3}>
			<Grid sx={{ position: 'relative' }} item sm={12} xs={12}>
				<LocationsBanner />
			</Grid>

			<Grid item sm={12} xs={12}>
				<CardHeader
					sx={{
						position: 'absolute',
						top: '20px',
					}}
					action={(
						<IconButton
							onClick={() => pageHistoryReturn(router, constants.PATH_LOCATIONS_PAGE)}
							aria-label='return'
						>
							<ArrowBack />
						</IconButton>
					)}
				/>
				<Alert severity='info' color={'secondary' as AlertColor}>
					<Box sx={{ display: 'flex', alignItems: 'center' }}>
						Your favorites locations list.
						<Link
							href={constants.PATH_LOCATIONS_PAGE}
							style={{ padding: 2, zIndex: 3000 }}
						>
							Click here
						</Link>
						to find others locations.
					</Box>
				</Alert>
			</Grid>

			<Grid item sm={12} xs={12}>
				<LocationsDataGrid
					listaData={locationsData}
					isLoading={episodesLoading}
					pagination={false}
				/>
			</Grid>
		</Grid>
	);
}
