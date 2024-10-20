import { Box } from '@mui/material';

import Banner from '@/components/Banner';
import LocationsBannerIllustration from '@/components/illustrations/LocationsBannerIllustration';

export default function LocationsBanner() {
	return (
		<Box sx={{ position: 'relative', width: '100%' }}>
			<LocationsBannerIllustration />
			<Banner
				title='List of Locations'
				subtitle='Rick and Morty Catalog'
			/>
		</Box>
	);
}
