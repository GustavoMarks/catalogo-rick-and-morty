import { useCallback, useEffect, useRef, useState } from 'react';

import Box from '@mui/material/Box';
import Slide from '@mui/material/Slide';

import { setMovingEyesAnimation } from '@/helpers/utils';

const MAIN_IMG_ID = 'summer-illustration';

export default function LocationsBannerIllustration() {
	const [angleMovingAnimation, setAngleMovingAnimation] = useState(0);

	const containerRef = useRef<HTMLElement>(null);

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
				width: '100%',
				height: '280px',
				overflow: 'hidden',
				position: 'absolute',
				bottom: '-90px',
				zIndex: (theme) => theme.zIndex.modal,
			}}
			ref={containerRef}
		>
			<Slide in direction='left' timeout={1500} container={containerRef.current}>
				<Box
					sx={{
						position: 'absolute',
						right: '40px',
					}}
				>
					<img
						id={MAIN_IMG_ID}
						src='/images/jerry.png'
						alt='rick and morty'
						width={280}
					/>
					<img
						src='/images/eye.jpg'
						alt='beth right eye'
						width={16}
						style={{
							position: 'absolute',
							bottom: '178px',
							right: '142px',
							transform: `rotate(${90 + angleMovingAnimation}deg)`,
						}}
					/>
					<img
						src='/images/eye.jpg'
						alt='summer left eye'
						width={16}
						style={{
							position: 'absolute',
							bottom: '178px',
							right: '100px',
							transform: `rotate(${90 + angleMovingAnimation}deg)`,
						}}
					/>
				</Box>
			</Slide>
			<div style={{ position: 'absolute' }} />
		</Box>
	);
}
