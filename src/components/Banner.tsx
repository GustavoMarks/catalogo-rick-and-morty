import { ReactNode } from 'react';

import {
	Card,
	CardContent,
	CardMedia,
	Skeleton,
	Typography,
} from '@mui/material';

type Props = {
	bigger?: boolean;
	children?: ReactNode;
	loading?: boolean;
	subtitle: string;
	title: string;
};

export default function Banner(props: Props) {
	const { bigger = false, children, loading = false, subtitle, title } = props;
	return (
		<Card
			sx={{
				height: bigger ? '400px' : '300px',
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
					{
						loading ? <Skeleton width={500} /> : title
					}
				</Typography>
				<Typography
					variant='h6'
					sx={{
						zIndex: (theme) => theme.zIndex.modal,
						textShadow: '0 0 8px #000',
					}}
				>
					{subtitle}
				</Typography>
			</CardContent>
			{children}
		</Card>
	);
}
