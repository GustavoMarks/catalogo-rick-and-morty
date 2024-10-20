import { useState } from 'react';

import { useRouter } from 'next/router';

import MenuIcon from '@mui/icons-material/Menu';
import { AppBar as MUIAppBar, Box, Link, Typography, Container, Button, Menu, MenuItem, Tooltip, IconButton } from '@mui/material';

import fontFamily from '@/configs/fontFamily';
import constants from '@/helpers/constants';

const menuList = [
	{ title: 'Home', path: '/' },
	{ title: 'Characters', path: constants.PATH_CHARACTERS_PAGE },
	{ title: 'Episodes', path: constants.PATH_EPISODES_PAGE },
	{ title: 'Locations', path: constants.PATH_LOCATIONS_PAGE },
];

function MenuLinkAppBar({ path, title }: { path: string, title: string }) {
	const router = useRouter();
	const isCurrentPath = router.asPath === path;

	return (
		<Button
			LinkComponent={Link}
			href={path}
			disabled={isCurrentPath}
		>
			{title}
		</Button>
	);
}

export default function AppBar() {
	const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

	const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElNav(event.currentTarget);
	};

	return (
		<MUIAppBar
			position='static'
		>
			<Box
				className={fontFamily.className}
				component='footer'
				sx={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					height: constants.APPBAR_REM_HEIGHT,
					width: '100%',
					backgroundColor: (theme) => theme.palette.background.paper,
				}}
			>
				<Container
					maxWidth='xl'
				>
					<Box
						sx={{
							display: 'flex',
							flexDirection: 'row',
							alignItems: 'center',
							justifyContent: 'space-around',
							alignContent: 'space-around',
							width: '100%',
						}}
					>
						<Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
							<img
								src='/images/icons/favicon-32x32.png'
								alt='Rick and morty icon'
							/>
							<Typography
								sx={{
									color: (theme) => theme.palette.primary.main,
									fontWeight: 'bolder',
									ml: 1,
								}}
							>
								Rick and Morty Catalog
							</Typography>
						</Box>

						<Box
							sx={{
								flexGrow: 1,
								display: { xs: 'none', md: 'flex' },
								justifyContent: 'flex-end',
							}}
						>
							{
								menuList.map((item) => <MenuLinkAppBar key={item.title} {...item} />)
							}
						</Box>
						<Box
							sx={{
								flexGrow: 1,
								display: { xs: 'flex', md: 'none' },
								justifyContent: 'flex-end',
							}}
						>
							<Tooltip title='Open menu'>
								<IconButton onClick={handleOpenNavMenu} sx={{ p: 0 }}>
									<MenuIcon />
								</IconButton>
							</Tooltip>
							<Menu
								sx={{ mt: '45px' }}
								id='menu-appbar'
								className={fontFamily.className}
								anchorEl={anchorElNav}
								anchorOrigin={{
									vertical: 'top',
									horizontal: 'right',
								}}
								keepMounted
								transformOrigin={{
									vertical: 'top',
									horizontal: 'right',
								}}
								open={Boolean(anchorElNav)}
								onClose={() => setAnchorElNav(null)}
							>
								{
									menuList.map((item) => (
										<MenuItem key={item.title}>
											<MenuLinkAppBar {...item} />
										</MenuItem>
									))
								}
							</Menu>
						</Box>
					</Box>
				</Container>
			</Box>
		</MUIAppBar>
	);
}
