import { useState } from 'react';

import Link from 'next/link';

import {
	Box,
	Button,
	Card,
	CardActionArea,
	CardContent,
	CardHeader,
	CardMedia,
	Divider,
	Grid,
	Grow,
	Typography,
} from '@mui/material';

import Banner from '@/components/Banner';
import HomeBannerIllustration from '@/components/illustrations/HomeBannerIllustration';

import constants from '@/helpers/constants';

interface CardPageProps {
	hrefImg: string;
	altImgText: string;
	path: string;
	description: string;
	title: string;
}

function CargPage(props: CardPageProps) {
	const { hrefImg, altImgText, path, description, title } = props;
	const [hoverOn, setHoverOn] = useState(false);

	return (
		<Grow in timeout={500}>
			<div
				onMouseOver={() => setHoverOn(true)}
				onFocus={() => setHoverOn(true)}
				onMouseLeave={() => setHoverOn(false)}
			>
				<Card sx={{ display: 'flex' }} elevation={hoverOn ? 10 : undefined}>
					<CardMedia
						component='img'
						image={hrefImg}
						title={altImgText}
						sx={{ width: hoverOn ? 200 : 150 }}
					/>
					<CardActionArea LinkComponent={Link} href={path} sx={{ display: 'flex' }}>
						<Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
							<CardHeader title={title} />
							<CardContent>
								<Typography paragraph variant='body2'>
									{description}
								</Typography>
								<Button
									variant='contained'
									color='secondary'
									sx={{ fontWeight: 'bolder' }}
								>
									Show me what you got ➜
								</Button>
							</CardContent>
						</Box>
					</CardActionArea>

				</Card>
			</div>
		</Grow>
	);
}

export default function Home() {
	return (
		<Grid container spacing={3} mb={3}>
			<Grid sx={{ position: 'relative' }} item sm={12} xs={12}>
				<Banner
					title='Rick and Morty Catalog'
					subtitle='find everything about the series'
					bigger
				>
					<HomeBannerIllustration />
				</Banner>
			</Grid>
			<Grid item sm={12}>
				<Box sx={{ color: (theme) => theme.palette.text.secondary }}>
					<Divider>
						<Typography
							variant='h6'
							padding={3}
						>
							Search and save yours favorites
						</Typography>
					</Divider>
				</Box>
			</Grid>
			<Grid item sm={12} md={4} xs={12}>
				<CargPage
					title='Characters'
					hrefImg={constants.URL_CHARACTERS_CARD_IMG}
					altImgText='Baby Wizard'
					path={constants.PATH_CHARACTERS_PAGE}
					description='Search for all characters in the series, filtering by name, life status'
				/>
			</Grid>
			<Grid item sm={12} md={4} xs={12}>
				<CargPage
					title='Episodes'
					hrefImg={constants.URL_EPISODES_CARD_IMG}
					altImgText='Pickle Rick'
					path={constants.PATH_EPISODES_PAGE}
					description='Search for all episodes shown so far, filter by name and code'
				/>
			</Grid>
			<Grid item sm={12} md={4} xs={12}>
				<CargPage
					title='Locations'
					hrefImg={constants.URL_LOCATIONS_CARD_IMG}
					altImgText='Hole in the Wall Where the Men Can See it All'
					path={constants.PATH_LOCATIONS_PAGE}
					description='Search for all locations in the world of Rick and Morty and filter by name, type and dimension.'
				/>
			</Grid>
		</Grid>
	);
}
