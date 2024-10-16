import { FilterAltOffOutlined } from '@mui/icons-material';
import { Button, Tooltip, Typography } from '@mui/material';

import fontFamily from '@/configs/fontFamily';

interface ClearFiltersBtnProps {
	onClick: () => void;
}

export default function ClearFiltersBtn({ onClick }: ClearFiltersBtnProps) {
	return (
		<Tooltip
			arrow
			title={(
				<Typography variant='caption' className={fontFamily.className}>
					Clear all filters
				</Typography>
			)}
		>
			<Button
				fullWidth
				sx={{ height: '100%' }}
				variant='outlined'
				color='secondary'
				onClick={onClick}
			>
				<FilterAltOffOutlined />
			</Button>
		</Tooltip>
	);
}
