import { useCallback, useEffect, useState } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/router';

import { ArrowBack } from '@mui/icons-material';
import {
	Alert,
	AlertColor,
	Box,
	CardHeader,
	Grid,
	IconButton,
} from '@mui/material';

import constants from '@/helpers/constants';
import { pageHistoryReturn } from '@/helpers/utils';
import useCharacters from '@/hooks/useCharacters';
import useFavs from '@/hooks/useFavs';
import { CharacterSchema } from '@/services/characters/types';
import CharactersBanner from '@/views/characters/CharactersBanner';
import CharactersDataGrid from '@/views/characters/CharactersDataGrid';

export default function CharacterList() {
	const [charactersData, setCharactersData] = useState<CharacterSchema[]>();

	const router = useRouter();
	const { favCharactersIds } = useFavs();

	const { getCharactersByIDListMutation } = useCharacters();
	const { isLoading: charactersLoading } = getCharactersByIDListMutation;

	const handleUpdateCharactersData = useCallback(async (idsList: string[]) => {
		try {
			const fetchedData = await getCharactersByIDListMutation.mutateAsync(idsList);
			setCharactersData(fetchedData);
		} catch (err) {
			setCharactersData(undefined);
		}
	}, []);

	useEffect(() => {
		handleUpdateCharactersData(favCharactersIds);
	}, [
		favCharactersIds,
	]);

	return (
		<Grid container spacing={3} mb={3}>
			<Grid sx={{ position: 'relative' }} item sm={12} xs={12}>
				<CharactersBanner />
			</Grid>

			<Grid item sm={12} xs={12}>
				<CardHeader
					sx={{
						position: 'absolute',
						top: '20px',
					}}
					action={(
						<IconButton
							onClick={() => pageHistoryReturn(router, constants.PATH_CHARACTERS_PAGE)}
							aria-label='return'
						>
							<ArrowBack />
						</IconButton>
					)}
				/>
				<Alert severity='info' color={'secondary' as AlertColor}>
					<Box sx={{ display: 'flex', alignItems: 'center' }}>
						Your favorites characters list.
						<Link
							href={constants.PATH_CHARACTERS_PAGE}
							style={{ padding: 2 }}
						>
							Click here
						</Link>
						to find others characters.
					</Box>
				</Alert>
			</Grid>

			<Grid item sm={12} xs={12}>
				<CharactersDataGrid
					listaData={charactersData}
					isLoading={charactersLoading}
					pagination={false}
				/>
			</Grid>
		</Grid>
	);
}
