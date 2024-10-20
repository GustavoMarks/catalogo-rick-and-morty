import { useCallback } from 'react';

import Link from 'next/link';

import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import { GridColDef } from '@mui/x-data-grid';

import DataGrid from '@/components/DataGrid';
import DetailsTooltipLink, { DetailTooltipLinkTypes } from '@/components/DetailsTooltipLink';
import FavToolotip from '@/components/FavTooltip';

import { ModuleTypes } from '@/helpers/constants';
import { getPathCharactersListFromLocation } from '@/helpers/utils';
import { GetAllLocationsFiltersProps, GetAllLocationsProps, LocationSchema } from '@/services/locations/types';

const columns: GridColDef<LocationSchema>[] = [
	{ field: 'name', headerName: 'Name', flex: 1.5 },
	{ field: 'type', headerName: 'Type', flex: 0.5 },
	{ field: 'dimension', headerName: 'Dimension', flex: 0.5 },
	{
		field: 'options',
		headerName: 'Options',
		flex: 0.5,
		sortable: false,
		renderCell: ({ row }) => {
			const chractersListPath = getPathCharactersListFromLocation(row);
			return (
				<Box>
					<DetailsTooltipLink id={row.id} type={DetailTooltipLinkTypes.location} />
					<Link href={chractersListPath}>
						<Chip sx={{ ml: 1 }} label='Residents List' clickable />
					</Link>
					<FavToolotip id={String(row.id)} type={ModuleTypes.locations} />
				</Box>
			);
		},
	},
];

interface LocationsDataGridProps {
	data?: GetAllLocationsProps | null;
	listaData?: LocationSchema[];
	filters?: GetAllLocationsFiltersProps;
	isLoading: boolean;
	pagination?: boolean;
	onFiltersChange?: (filters: GetAllLocationsFiltersProps) => void;
}

export default function LocationsDataGrid(props: LocationsDataGridProps) {
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
