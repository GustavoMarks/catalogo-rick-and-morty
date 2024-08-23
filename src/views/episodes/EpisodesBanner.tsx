import {
	Card,
	CardContent,
	CardMedia,
	Typography,
} from '@mui/material';

import EpisodesBannerIllustration from '@/components/illustrations/EpisodesBannerIllustration';

export default function EpisodesBanner() {
	return (
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
					List of Episodes
				</Typography>
				<Typography
					variant='h6'
					sx={{
						zIndex: (theme) => theme.zIndex.modal,
						textShadow: '0 0 8px #000',
					}}
				>
					Rick and Morty Catalog
				</Typography>
			</CardContent>
			<EpisodesBannerIllustration />
		</Card>
	);
}
