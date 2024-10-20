import { Skeleton } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

interface InfoBoxProps {
	description?: string;
	icon?: JSX.Element;
	loading?: boolean;
	title: string;
}

export default function InfoBox(props: InfoBoxProps) {
	const { description, icon, loading, title } = props;
	return (
		<Box sx={{
			display: 'flex',
			alignItems: 'flex-start',
			mr: 2,
		}}
		>
			<Avatar variant='rounded' sx={{ mt: 1 }}>
				{icon}
			</Avatar>
			<Box sx={{ ml: 2 }}>
				<Typography variant='caption'>
					{' '}
					{title}
					{' '}
				</Typography>
				<Typography variant='body1'>
					{
						loading ? <Skeleton width={100} /> : (description || 'Unknown')
					}
				</Typography>
			</Box>
		</Box>
	);
}
