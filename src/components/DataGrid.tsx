import { alpha, styled } from '@mui/material';
import Box from '@mui/material/Box';
import MuiPagination from '@mui/material/Pagination';
import { TablePaginationProps } from '@mui/material/TablePagination';
import { DataGridProps, gridClasses, gridPageCountSelector, GridPagination, useGridApiContext, useGridSelector } from '@mui/x-data-grid';
import { DataGrid as MuiDataGrid } from '@mui/x-data-grid/DataGrid';

const StyledDataGrid = styled(MuiDataGrid)(({ theme }) => ({
	[`& .${gridClasses.row}.even`]: {
		backgroundColor: theme.palette.action.disabledBackground,
		'&:hover': {
			backgroundColor: alpha(theme.palette.action.disabledBackground, 0.2),
			'@media (hover: none)': {
				backgroundColor: 'transparent',
			},
		},
	},
}));

function Pagination({
	page,
	onPageChange,
	className,
}: Pick<TablePaginationProps, 'page' | 'onPageChange' | 'className'>) {
	const apiRef = useGridApiContext();
	const pageCount = useGridSelector(apiRef, gridPageCountSelector);

	return (
		<MuiPagination
			color='secondary'
			className={className}
			count={pageCount}
			page={page + 1}
			onChange={(event, newPage) => {
				onPageChange(event as any, newPage - 1);
			}}
		/>
	);
}

function CustomPagination(props: any) {
	return <GridPagination ActionsComponent={Pagination} {...props} />;
}

export default function DataGrid(props: DataGridProps) {
	return (
		<Box
			sx={{
				height: '60vh',
				width: '100%',
				overflow: 'auto',
			}}
		>
			<StyledDataGrid
				{...props}
				getRowClassName={(params) =>
					params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : ''}
				slots={{
					pagination: props.pagination ? CustomPagination : null,
				}}
			/>
		</Box>
	);
}
