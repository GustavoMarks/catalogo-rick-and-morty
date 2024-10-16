import Link from 'next/link';

import { FavoriteTwoTone, OpenInNew } from '@mui/icons-material';
import { Badge, Button, Tooltip, Typography } from '@mui/material';

import fontFamily from '@/configs/fontFamily';
import constants, { ModuleTypes } from '@/helpers/constants';

interface FilterFavBtnProps {
	type: ModuleTypes;
}

export default function FilterFavBtn({ type }: FilterFavBtnProps) {
	const getHref = () => {
		switch (type) {
			case ModuleTypes.characters:
				return `${constants.PATH_CHARACTERS_PAGE}/favorites`;
			case ModuleTypes.episodes:
				return `${constants.PATH_EPISODES_PAGE}/favorites`;
			case ModuleTypes.locations:
				return `${constants.PATH_LOCATIONS_PAGE}/favorites`;
			default: return '';
		}
	};
	return (
		<Tooltip
			arrow
			title={(
				<Typography variant='caption' className={fontFamily.className}>
					See my favorites
					{` ${type}!`}
				</Typography>
			)}
		>
			<Button
				fullWidth
				sx={{ height: '100%' }}
				variant='outlined'
				color='secondary'
				LinkComponent={Link}
				href={getHref()}
			>
				<Badge
					badgeContent={<OpenInNew fontSize='inherit' color='secondary' />}
				>
					<FavoriteTwoTone />
				</Badge>
			</Button>
		</Tooltip>
	);
}
