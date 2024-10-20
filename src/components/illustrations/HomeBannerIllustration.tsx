import { useCallback, useEffect, useState } from 'react';

import Box from '@mui/material/Box';
import Slide from '@mui/material/Slide';

import { setMovingEyesAnimation } from '@/helpers/utils';

const MAIN_IMG_ID = 'rick-and-morty-illustration';

export default function HomeBannerIllustration() {
	const [angleMovingAnimation, setAngleMovingAnimation] = useState(0);

	const setMovingEyesAnimationCallback = useCallback((event: MouseEvent) => {
		setMovingEyesAnimation(event, setAngleMovingAnimation, MAIN_IMG_ID);
	}, [setAngleMovingAnimation]);

	useEffect(() => {
		document?.addEventListener('mousemove', setMovingEyesAnimationCallback, true);
		return function clear() {
			document?.removeEventListener('mousemove', setMovingEyesAnimationCallback, true);
		};
	}, []);

	return (
		<Box
			sx={{
				display: { xs: 'none', md: 'flex' },
				height: '400px',
				width: '100%',
			}}
		>
			<Slide in direction='left' timeout={1500}>
				<Box
					sx={{
						position: 'absolute',
						right: '-50px',
						bottom: '-5px',
					}}
				>
					<img
						id={MAIN_IMG_ID}
						src='/images/rick-and-morty.png'
						alt='rick and morty'
						width={500}
					/>
					<img
						src='/images/eye.jpg'
						alt='rick right eye'
						width={15}
						style={{
							position: 'absolute',
							bottom: '193px',
							right: '180px',
							transform: `rotate(${90 + angleMovingAnimation}deg)`,
						}}
					/>
					<img
						src='/images/eye.jpg'
						alt='rick left eye'
						width={15}
						style={{
							position: 'absolute',
							bottom: '193px',
							right: '215px',
							transform: `rotate(${90 + angleMovingAnimation}deg)`,
						}}
					/>
					<img
						src='/images/eye.jpg'
						alt='morty right eye'
						width={15}
						style={{
							position: 'absolute',
							bottom: '103px',
							right: '275px',
							transform: `rotate(${90 + angleMovingAnimation}deg)`,
						}}
					/>
					<img
						src='/images/eye.jpg'
						alt='morty left eye'
						width={15}
						style={{
							position: 'absolute',
							bottom: '96px',
							right: '318px',
							transform: `rotate(${90 + angleMovingAnimation}deg)`,
						}}
					/>
				</Box>
			</Slide>
			<div style={{ position: 'absolute' }} />
		</Box>
	);
}
