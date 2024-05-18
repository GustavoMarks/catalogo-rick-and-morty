import { Box, Link, Typography } from "@mui/material";

interface FooterProps {
	className?: string;
};

export default function Footer(props: FooterProps) {
	return (
		<Box
			{...props}
			component='footer'
			sx={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				height: '5vh',
  			width: '100%',
				backgroundColor: (theme) => theme.palette.background.paper,
			}}
		>
			<Typography sx={{ color: (theme) => theme.palette.text.primary }} >
				2024 • <Link
					target="_blank"
					rel="noopener noreferrer"
					href="https://github.com/GustavoMarks/catalogo-rick-and-morty">
					&nbsp;Visit on GitHub
				</Link>
			</Typography>
		</Box>
	)
}