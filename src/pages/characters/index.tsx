import { useCallback, useState } from 'react';

import {
	Card,
	CardContent,
	CardMedia,
	Grid,
	Typography,
} from '@mui/material';

import CharactersBannerIllustration from '@/components/illustrations/CharactersBannerIllustration';

import useCharacters from '@/hooks/useCharacters';
import { GetAllCharacterFiltersProps, GetAllCharacterProps } from '@/services/characters/types';
import CharactersDataGrid from '@/views/characters/CharactersDataGrid';
import CharactersFiltersForm from '@/views/characters/CharactersFiltersForm';

export default function CharactersList() {
	const [data, setData] = useState<GetAllCharacterProps | null>(null);
	const [filters, setFilters] = useState<GetAllCharacterFiltersProps>({});
	const { getAllChachersByFilterMutation } = useCharacters();

	const { isLoading } = getAllChachersByFilterMutation;

	const handleUpdateData = useCallback(async (newFilters?: GetAllCharacterFiltersProps) => {
		try {
			const fetchedData = await getAllChachersByFilterMutation.mutateAsync(newFilters);
			setData(fetchedData);
		} catch (err) {
			setData(null);
		}
	}, [filters]);

	return (
		<Grid container spacing={3} mb={3}>
			<Grid sx={{ position: 'relative' }} item sm={12} xs={12}>
				<Card
					sx={{
						height: '300px',
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
							List of Characters
						</Typography>
						<Typography
							variant='h6'
							sx={{
								zIndex: (theme) => theme.zIndex.modal,
								textShadow: '0 0 8px #000',
							}}
						>
							Rick and Morty Catalog
						</Typography>
					</CardContent>
					<CharactersBannerIllustration />
				</Card>
			</Grid>

			<Grid item sm={12}>
				<CharactersFiltersForm
					filters={filters}
					onChange={setFilters}
					handleUpdateData={handleUpdateData}
				/>
			</Grid>
			<Grid item sm={12} xs={12}>
				<CharactersDataGrid
					data={data}
					isLoading={isLoading}
					filters={filters}
					onFiltersChange={setFilters}
				/>
			</Grid>
		</Grid>
	);
}
