import { useCallback, useState } from 'react';

import Link from 'next/link';

import { Avatar, Box, Chip, Typography } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';

import DataGrid from '@/components/DataGrid';
import DetailsTooltipLink, { DetailTooltipLinkTypes } from '@/components/DetailsTooltipLink';
import FavToolotip from '@/components/FavTooltip';
import ModalExpandImg from '@/components/ModalExpandImg';

import { ModuleTypes } from '@/helpers/constants';
import { getPathEpisodesListForCharacter, getPathLocationDetailFromCharacterOrigin } from '@/helpers/utils';
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
	{
		field: 'origin.name',
		headerName: 'Origin',
		flex: 1,
		valueGetter: (value, row) => row.origin.name || '-',
		renderCell: ({ row }) => {
			const locationDetailPath = getPathLocationDetailFromCharacterOrigin(row.origin);
			if (!locationDetailPath) return row.origin.name;
			return (
				<Link style={{ color: 'inherit' }} href={locationDetailPath}>
					{row.origin.name}
				</Link>
			);
		},
	},
	{
		field: 'location.name',
		headerName: 'Location',
		flex: 1,
		valueGetter: (value, row) => row.location.name || '-',
		renderCell: ({ row }) => {
			const locationDetailPath = getPathLocationDetailFromCharacterOrigin(row.location);
			if (!locationDetailPath) return row.location.name;
			return (
				<Link style={{ color: 'inherit' }} href={locationDetailPath}>
					{row.location.name}
				</Link>
			);
		},
	},
	{
		field: 'options',
		headerName: 'Options',
		flex: 1,
		sortable: false,
		renderCell: ({ row }) => {
			const episodeListPath = getPathEpisodesListForCharacter(row);
			return (
				<Box>
					<DetailsTooltipLink id={row.id} type={DetailTooltipLinkTypes.character} />
					<Link href={episodeListPath}>
						<Chip sx={{ ml: 1 }} label='Episodes List' clickable />
					</Link>
					<FavToolotip id={String(row.id)} type={ModuleTypes.characters} />
				</Box>
			);
		},
	},
];

interface CharactersDataGridProps {
	data?: GetAllCharacterProps | null;
	listaData?: CharacterSchema[];
	filters?: GetAllCharacterFiltersProps;
	isLoading: boolean;
	pagination?: boolean;
	onFiltersChange?: (filters: GetAllCharacterFiltersProps) => void;
}

export default function CharactersDataGrid(props: CharactersDataGridProps) {
	const { data, listaData, filters, isLoading, pagination = true, onFiltersChange } = props;

	const getCurrentPage = useCallback(() => {
		if (!filters || !filters?.page) return 0;
		const parsedPage = parseInt(filters.page, 10);
		if (parsedPage >= 1) return parsedPage - 1;
		return 0;
	}, [filters?.page]);

	return (
		<DataGrid
			rows={listaData || data?.results || []}
			columns={columns}
			disableRowSelectionOnClick
			loading={isLoading}
			localeText={{ noRowsLabel: 'No results' }}
			pagination={pagination || undefined}
			pageSizeOptions={[]}
			paginationModel={pagination ? { pageSize: 20, page: getCurrentPage() } : undefined}
			paginationMode={pagination ? 'server' : undefined}
			rowCount={data?.info.count || undefined}
			onPaginationModelChange={
				pagination ?
					(model) => onFiltersChange?.({ ...filters, page: String(model.page + 1) })
					: undefined
			}
		/>
	);
}
