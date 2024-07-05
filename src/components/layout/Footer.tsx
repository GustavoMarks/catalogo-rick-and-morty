import { GitHub } from '@mui/icons-material';
import { Box, Container, Link, Typography } from '@mui/material';

import fontFamily from '@/configs/fontFamily';
import constants from '@/helpers/constants';
import LIB_VERSION from '@/version';

export default function Footer() {
	return (
		<Box
			className={fontFamily.className}
			component='footer'
			sx={{
				height: constants.FOOTER_REM_HEIGHT,
				width: '100%',
				backgroundColor: (theme) => theme.palette.background.paper,
			}}
		>
			<Container maxWidth='xl'>
				<Box
					sx={{
						display: 'flex',
						justifyContent: 'space-between',
						alignItems: 'center',
						height: constants.FOOTER_REM_HEIGHT,
					}}
				>
					<Typography sx={{ color: (theme) => theme.palette.text.primary }}>
						2024 •
						{` v${LIB_VERSION} `}
						<Link
							target='_blank'
							rel='noopener noreferrer'
							href={constants.URL_AUTHOR}
						>
							{'<> by @GustavoMarks'}
						</Link>
					</Typography>
					<Typography sx={{ color: (theme) => theme.palette.text.primary }}>
						<Link
							target='_blank'
							rel='noopener noreferrer'
							href={constants.URL_REPOSITORY}
						>
							<GitHub sx={{ mr: 1, mb: -1, ml: -5 }} />
							Visit this project on GitHub
						</Link>
					</Typography>
					<Typography sx={{ color: (theme) => theme.palette.text.primary }}>
						<Link
							target='_blank'
							rel='noopener noreferrer'
							href={constants.URL_ABOUT_API}
						>
							Visit the API
						</Link>
					</Typography>
				</Box>
			</Container>
		</Box>
	);
}
