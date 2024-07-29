import { useCallback, useEffect, useState } from 'react';

import Box from '@mui/material/Box';
import Slide from '@mui/material/Slide';

import { setMovingEyesAnimation } from '@/helpers/utils';

const MAIN_IMG_ID = 'summer-illustration';

export default function CharactersBannerIllustration() {
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
						right: '40px',
						bottom: '-5px',
					}}
				>
					<img
						id={MAIN_IMG_ID}
						src='/images/summer.png'
						alt='rick and morty'
						width={180}
					/>
					<img
						src='/images/eye.jpg'
						alt='summer right eye'
						width={9}
						style={{
							position: 'absolute',
							bottom: '188px',
							right: '90px',
							transform: `rotate(${90 + angleMovingAnimation}deg)`,
						}}
					/>
					<img
						src='/images/eye.jpg'
						alt='summer left eye'
						width={9}
						style={{
							position: 'absolute',
							bottom: '190px',
							right: '55px',
							transform: `rotate(${90 + angleMovingAnimation}deg)`,
						}}
					/>
				</Box>
			</Slide>
			<div style={{ position: 'absolute' }} />
		</Box>
	);
}
