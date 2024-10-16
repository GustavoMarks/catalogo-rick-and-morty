import { FavoriteBorderOutlined, FavoriteOutlined } from '@mui/icons-material';
import { IconButton, Tooltip, Typography } from '@mui/material';

import fontFamily from '@/configs/fontFamily';
import { ModuleTypes } from '@/helpers/constants';
import useFavs from '@/hooks/useFavs';

interface FavTooltipProps {
	type: ModuleTypes;
	id: string;
}

export default function FavToolotip(props: FavTooltipProps) {
	const { id, type } = props;

	const { checkIsFav, addToFavs, removeFromFavs } = useFavs();
	const isFav = checkIsFav(id, type);

	const handleToggleFav = () => {
		if (isFav) {
			removeFromFavs(id, type);
		} else {
			addToFavs(id, type);
		}
	};

	return (
		<Tooltip
			arrow
			title={
				isFav ?
					<Typography variant='caption' className={fontFamily.className}>Remove favorite</Typography> :
					<Typography variant='caption' className={fontFamily.className}>Favorite</Typography>
			}
		>
			<IconButton onClick={handleToggleFav} color='secondary'>
				{
					isFav ? <FavoriteOutlined /> : <FavoriteBorderOutlined />
				}
			</IconButton>
		</Tooltip>
	);
}
