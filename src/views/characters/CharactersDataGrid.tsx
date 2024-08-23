import { useCallback, useState } from 'react';

import Link from 'next/link';

import { OpenInNew } from '@mui/icons-material';
import { Avatar, Box, Chip, Typography } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';

import DataGrid from '@/components/DataGrid';
import ModalExpandImg from '@/components/ModalExpandImg';

import constants from '@/helpers/constants';
import { getIdFromApiURL } from '@/helpers/utils';
import { CharacterSchema, GetAllCharacterFiltersProps, GetAllCharacterProps } from '@/services/characters/types';

function RenderCharacterNameAvatar({ data }: { data: CharacterSchema }) {
	const [expanded, setExpanded] = useState('');
	return (
		<>
			<Box
				display='flex'
				justifyContent='flex-start'
				alignItems='center'
				mb={0}
				height='100%'
				width='100%'
				sx={{
					cursor: 'zoom-in',
				}}
				onClick={() => setExpanded(data.image)}
			>
				<Avatar alt={data.name} src={data.image} />
				<Typography sx={{ ml: 3 }}>{data.name}</Typography>
			</Box>
			<ModalExpandImg title={data.name} urlOpen={expanded} onClose={() => setExpanded('')} />
		</>
	);
}

const columns: GridColDef<CharacterSchema>[] = [
	{ field: 'name', headerName: 'Name', flex: 1.5, renderCell: ({ row }) => <RenderCharacterNameAvatar data={row} /> },
	{ field: 'status', headerName: 'Status', flex: 0.5 },
	{ field: 'species', headerName: 'Species', flex: 0.5 },
	{ field: 'type', headerName: 'Type', flex: 1, valueGetter: (value) => value || '-' },
	{ field: 'gender', headerName: 'Gender', flex: 0.5, valueGetter: (value) => value || '-' },
	{ field: 'origin.name', headerName: 'Origin', flex: 1, valueGetter: (value, row) => row.origin.name || '-' },
	{ field: 'location.name', headerName: 'Location', flex: 1, valueGetter: (value, row) => row.location.name || '-' },
	{
		field: 'options',
		headerName: 'Options',
		flex: 0.8,
		sortable: false,
		renderCell: ({ row }) => {
			const episodeIdList = row.episode.map((ep) => getIdFromApiURL(ep));
			return (
				<Box>
					<Link href={`${constants.PATH_CHARACTERS_PAGE}/details/${row.id}`}>
						<Chip
							label={<OpenInNew sx={{ mb: -1 }} />}
							clickable
						/>
					</Link>
					<Link href={`${constants.PATH_EPISODES_PAGE}/list/${String(episodeIdList)}?id_character=${row.id}`}>
						<Chip sx={{ ml: 1 }} label='Episodes List' clickable />
					</Link>
				</Box>
			);
		},
	},
];

interface CharactersDataGridProps {
	data: GetAllCharacterProps | null;
	filters: GetAllCharacterFiltersProps;
	isLoading: boolean;
	onFiltersChange: (filters: GetAllCharacterFiltersProps) => void;
}

export default function CharactersDataGrid(props: CharactersDataGridProps) {
	const { data, filters, isLoading, onFiltersChange } = props;

	const getCurrentPage = useCallback(() => {
		if (!filters || !filters?.page) return 0;
		const parsedPage = parseInt(filters.page, 10);
		if (parsedPage >= 1) return parsedPage - 1;
		return 0;
	}, [filters.page]);

	return (
		<DataGrid
			rows={data?.results || []}
			columns={columns}
			disableRowSelectionOnClick
			loading={isLoading}
			localeText={{ noRowsLabel: 'No results' }}
			pagination
			pageSizeOptions={[]}
			paginationModel={{ pageSize: 20, page: getCurrentPage() }}
			paginationMode='server'
			rowCount={data?.info.count || 0}
			onPaginationModelChange={
				(model) => onFiltersChange({ ...filters, page: String(model.page + 1) })
			}
		/>
	);
}
