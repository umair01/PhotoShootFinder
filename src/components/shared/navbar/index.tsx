import React, { FunctionComponent, useEffect, useState } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Button,
  MenuItem,
  Theme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useLocation, useNavigate } from "react-router-dom";

const pages = [
  { name: "Home", link: "/" },
  { name: "Session", link: "/session" },
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
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            PhotoShootFinder
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
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
                display: { xs: "block", md: "none" },
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

          <Typography
            variant="h5"
            noWrap
            sx={{
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            PhotoShootFinder
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" }, ml: 4 }}>
            {pages.map((page, index) => (
              <Button
                key={page.name + index}
                onClick={() => handleCloseNavMenu(page.link)}
                disableRipple
                size="medium"
                sx={(theme: Theme) => ({
                  m: 2,
                  minWidth: "120px",
                  border: "1px solid",
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
                    color: theme.palette.text.secondary,
                    fontWeight: "bold",
                  },
                })}
              >
                {page.name}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Navbar;
