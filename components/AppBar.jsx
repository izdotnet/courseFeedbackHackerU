import * as React from "react";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Button,
  Tooltip,
  MenuItem,
  Container,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import FeedbackIcon from "@mui/icons-material/Feedback";
import Link from "next/link";

const pages = ["Add Course", "Statistics", "About"];
const paths = ["/addCourse", "/statistics", "/about"];

const ResponsiveAppBar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <FeedbackIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Link href="/">
            <Typography
              variant="h6"
              noWrap
              component="a"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                cursor: "pointer",
              }}
            >
              Course Feedback
            </Typography>
          </Link>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
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
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page, i) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">
                    <Link href={paths[i]}>{page}</Link>
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Box
            sx={{
              flexGrow: 1,
              justifyContent: "flex-end",
              display: { xs: "none", md: "flex" },
            }}
          >
            {pages.map((page, i) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{
                  my: 2,
                  color: "white",
                  display: "block",
                  mr: 2,
                  display: { xs: "none", md: "flex" },
                  fontWeight: 500,
                  letterSpacing: ".1rem",
                  color: "inherit",
                }}
              >
                <Link href={paths[i]}>{page}</Link>
              </Button>
            ))}
          </Box>

          <FeedbackIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Link href="/">
            <Typography
              variant="h5"
              noWrap
              component="a"
              href=""
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              CF
            </Typography>
          </Link>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
