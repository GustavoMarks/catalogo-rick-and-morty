import { Box } from "@mui/material";
import { ReactNode } from "react";

export default function MainContainer({ children } : { children: ReactNode }) {
	return (
		<Box
			component='main'
			sx={{
				margin: 0,
        padding: 0,
        minHeight: '95vh',
				backgroundColor: (theme) => theme.palette.primary.dark,
			}}
		>
			{ children }
		</Box>
	)
}