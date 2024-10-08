import { FavoriteBorderOutlined, FavoriteOutlined } from '@mui/icons-material';
import { Button } from '@mui/material';

interface FavButtonProps {
	isFav: boolean;
	onClick: () => void;
}

export default function FavButton({ isFav, onClick }: FavButtonProps) {
	return (
		<Button
			startIcon={isFav ? <FavoriteOutlined /> : <FavoriteBorderOutlined />}
			onClick={onClick}
		>
			{
				isFav ? 'Remove favorite' : 'Favorite'
			}
		</Button>
	);
}
