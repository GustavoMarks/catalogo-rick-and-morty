import Link from 'next/link';

import { OpenInNew } from '@mui/icons-material';
import { Typography } from '@mui/material';
import Chip from '@mui/material/Chip';
import Tooltip from '@mui/material/Tooltip';

import fontFamily from '@/configs/fontFamily';
import constants from '@/helpers/constants';

export enum DetailTooltipLinkTypes {
	character = 'character',
	episode = 'episode',
	location = 'location',
}

interface DetailsTooltipLinkProps {
	type: DetailTooltipLinkTypes;
	id: string | number;
}

export default function DetailsTooltipLink(props: DetailsTooltipLinkProps) {
	const { type, id } = props;

	let path = '';
	switch (type) {
		case DetailTooltipLinkTypes.character:
			path = `${constants.PATH_CHARACTERS_PAGE}/details/${id}`;
			break;
		case DetailTooltipLinkTypes.episode:
			path = `${constants.PATH_EPISODES_PAGE}/details/${id}`;
			break;
		case DetailTooltipLinkTypes.location:
			path = `${constants.PATH_LOCATIONS_PAGE}/details/${id}`;
			break;
		default:
			break;
	}

	if (!path) return null;
	return (
		<Link href={path}>
			<Tooltip
				arrow
				title={(
					<Typography variant='caption' className={fontFamily.className}>
						Open details page
					</Typography>
				)}
			>
				<Chip label={<OpenInNew fontSize='small' sx={{ mb: -1 }} />} clickable />
			</Tooltip>
		</Link>
	);
}
