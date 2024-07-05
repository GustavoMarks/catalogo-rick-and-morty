import { useCallback, useEffect, useState } from 'react';

import Box from '@mui/material/Box';
import Slide from '@mui/material/Slide';

import { getAngle } from '@/helpers/utils';

const MAIN_IMG_ID = 'rick-and-morty-illustration';

export default function HomeBannerIllustration() {
	const [angleMovingAnimation, setAngleMovingAnimation] = useState(0);

	const setMovingEyesAnimation = useCallback((event: MouseEvent) => {
		const anchor = document.getElementById(MAIN_IMG_ID);
		if (!anchor) return;

		const rekt = anchor.getBoundingClientRect();
		const anchorX = rekt.left + rekt.width / 2;
		const anchorY = rekt.top + rekt.height / 2;

		const mouseX = event.clientX;
		const mouseY = event.clientY;

		const newAngle = getAngle(mouseX, mouseY, anchorX, anchorY);
		setAngleMovingAnimation(newAngle);
	}, [setAngleMovingAnimation]);

	useEffect(() => {
		document?.addEventListener('mousemove', setMovingEyesAnimation, true);
		return function clear() {
			document?.removeEventListener('mousemove', setMovingEyesAnimation, true);
		};
	}, []);

	return (
		<Box
			sx={{
				display: { xs: 'none', md: 'flex' },
				// position: 'relative',
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
							bottom: '191px',
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
							bottom: '191px',
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
							bottom: '101px',
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
							bottom: '94px',
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
