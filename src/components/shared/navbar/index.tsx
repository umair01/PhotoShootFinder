import React, { FunctionComponent, useEffect, useState } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  MenuItem,
  Theme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useLocation, useNavigate } from "react-router-dom";

const pages = [
  { name: "Home", link: "/" },
  { name: "About us", link: "/about-us" },
];

const Navbar: FunctionComponent = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [activePage, setActivePage] = useState<string>(location.pathname);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  useEffect(() => {
    setActivePage(location.pathname);
  }, [location]);

  const handleCloseNavMenu = (pageLink: string = "") => {
    if (pageLink) {
      navigate(pageLink);
    }

    setAnchorElNav(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar sx={{ justifyContent: "space-between" }} disableGutters>
          <Typography
            variant="h6"
            noWrap
            sx={{
              display: "flex",

              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            PhotoShootFinder
          </Typography>

          <Box sx={{ display: "flex" }}>
            <IconButton
              size="large"
              aria-label="Menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={() => handleCloseNavMenu()}
              sx={{
                display: "block",
              }}
            >
              {pages.map((page, index) => (
                <MenuItem
                  key={page.name + index}
                  sx={(theme: Theme) => ({
                    fontWeight: activePage === page.link ? "bold" : "normal",
                    color:
                      activePage === page.link
                        ? theme.palette.text.secondary
                        : theme.palette.text.primary,
                    backgroundColor:
                      activePage === page.link
                        ? theme.palette.background.default
                        : "transparent",
                    "&:hover": {
                      backgroundColor: page.link
                        ? theme.palette.background.default
                        : "transparent",
                    },
                  })}
                  onClick={() => handleCloseNavMenu(page.link)}
                >
                  <Typography textAlign="center">{page.name}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Navbar;
