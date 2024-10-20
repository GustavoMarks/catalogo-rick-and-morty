import React from 'react';

import { CardActions, CardHeader, Modal } from '@mui/material';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';

import fontFamily from '@/configs/fontFamily';

interface ModalExpandImgProps {
	urlOpen: string;
	onClose: () => void;
	title?: string;
}

export default function ModalExpandImg(props: ModalExpandImgProps) {
	const { urlOpen, onClose, title } = props;
	return (
		<Modal
			open={!!urlOpen}
			onClose={onClose}
			className={fontFamily.className}
		>
			<Card
				sx={{
					position: 'absolute',
					top: '50%',
					left: '50%',
					transform: 'translate(-50%, -50%)',
					border: '0',
					display: 'flex',
					justifyContent: 'center',
					flexDirection: 'column',
					alignItems: 'center',
				}}
			>
				<CardHeader title={title} />
				<img
					src={urlOpen}
					style={{ minHeight: '80vh', objectFit: 'contain' }}
					alt={title || ''}
				/>
				<CardActions>
					<Button
						onClick={onClose}
						variant='outlined'
						color='secondary'
					>
						Fechar
					</Button>
				</CardActions>
			</Card>
		</Modal>
	);
}
