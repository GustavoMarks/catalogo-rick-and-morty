import React, { ReactNode } from 'react';

import { Box, Container } from '@mui/material';

import fontFamily from '@/configs/fontFamily';
import constants from '@/helpers/constants';

export default function MainContainer({ children }: { children: ReactNode }) {
	return (
		<Box
			className={fontFamily.className}
			component='main'
			sx={{
				display: 'flex',
				flexGrow: 1,
				flexDirection: 'column',
				margin: 0,
				padding: 0,
				minHeight: `calc(100vh - ${constants.FOOTER_REM_HEIGHT} - ${constants.APPBAR_REM_HEIGHT})`,
				backgroundColor: (theme) => theme.palette.primary.dark,
				overflowX: 'hidden',
				' & *': {
					...fontFamily.style,
				},
			}}
		>
			<Container
				maxWidth='xl'
				sx={{
					transition: 'all .25s ease-in-out',
					position: 'relative',
				}}
			>
				{children}
			</Container>
		</Box>
	);
}
