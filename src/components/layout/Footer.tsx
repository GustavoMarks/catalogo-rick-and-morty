import { Box, Link } from "@mui/material";

export default function Footer() {
	return (
		<Box
			component='footer'
			sx={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				height: '5vh',
  			width: '100%',
			}}
		>
			2024 • <Link
        target="_blank"
        rel="noopener noreferrer"
        href="https://github.com/GustavoMarks/catalogo-rick-and-morty">
        &nbsp;Visit on GitHub
      </Link>
		</Box>
	)
}