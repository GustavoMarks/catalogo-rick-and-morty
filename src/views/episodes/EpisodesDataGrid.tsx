import { useCallback } from 'react';

import Link from 'next/link';

import { Box, Chip } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';

import DataGrid from '@/components/DataGrid';
import DetailsTooltipLink, { DetailTooltipLinkTypes } from '@/components/DetailsTooltipLink';
import FavToolotip from '@/components/FavTooltip';

import { ModuleTypes } from '@/helpers/constants';
import { getPathCharachtersListForEpisode } from '@/helpers/utils';
import { EpisodeSchema, GetAllEpisodesFiltersProps, GetAllEpisodesProps } from '@/services/episodes/types';

const columns: GridColDef<EpisodeSchema>[] = [
	{ field: 'name', headerName: 'Name', flex: 1.5 },
	{ field: 'air_date', headerName: 'Air date', flex: 0.5 },
	{ field: 'episode', headerName: 'Episode', flex: 0.5 },
	{
		field: 'options',
		headerName: 'Options',
		flex: 0.5,
		sortable: false,
		renderCell: ({ row }) => {
			const chractersListPath = getPathCharachtersListForEpisode(row);
			return (
				<Box>
					<DetailsTooltipLink id={row.id} type={DetailTooltipLinkTypes.episode} />
					<Link href={chractersListPath}>
						<Chip sx={{ ml: 1 }} label='Characters List' clickable />
					</Link>
					<FavToolotip id={String(row.id)} type={ModuleTypes.episodes} />
				</Box>
			);
		},
	},
];

interface EpisodesDataGridProps {
	data?: GetAllEpisodesProps | null;
	listaData?: EpisodeSchema[];
	filters?: GetAllEpisodesFiltersProps;
	isLoading: boolean;
	pagination?: boolean;
	onFiltersChange?: (filters: GetAllEpisodesFiltersProps) => void;
}

export default function EpisodesDataGrid(props: EpisodesDataGridProps) {
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
