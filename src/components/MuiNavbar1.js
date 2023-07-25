import React, { useState } from "react";
import { useDispatch } from "react-redux";
// components
import MuiDrawer from "./MuiDrawer";

// MUI
import { Avatar, AppBar, Toolbar, IconButton, Typography, Button, Stack, Menu, MenuItem } from "@mui/material";
import avatar from "./../assets/images/logo.png";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
//import CatchingPokemonIcon from "@mui/icons-material/CatchingPokemon";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import SettingsIcon from "@mui/icons-material/Settings";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { logout } from "../pages/login/Login.Slice";

function MuiNavbar() {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleMenuClick = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <>
      <AppBar position="static" color="primary">
        <Toolbar>
          <MuiDrawer />
          {/* <IconButton size="large" edge="start" color="inherit" aria-label="logo">
            <CatchingPokemonIcon />
          </IconButton> */}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Stack direction="row" spacing={2}>
              <div>TZ-WhatsApp Bot</div>
            </Stack>
          </Typography>
          <Stack direction="row" spacing={2}>
            <Button color="inherit" id="userprofile-button" aria-controls={open ? "userprofile-menu" : undefined} aria-haspopup="true" aria-expanded={open ? "true" : undefined} onClick={handleMenuClick}>
              {/* Profile */}
              <Avatar sx={{ m: 1, bgcolor: "secondary.main", width: 37, height: 37 }}>
                <AccountCircleIcon />
                {/* <Avatar alt="Logo" src={avatar} /> */}
              </Avatar>
            </Button>
          </Stack>
          <Menu
            id="userprofile-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            MenuListProps={{
              "aria-labelledby": "userprofile-button",
            }}
          >
            <MenuItem onClick={handleClose}>
              <Stack direction="row" justifyContent="space-between" alignItems="flex-start" spacing={2} sx={{ display: "flex", alignItems: "center" }}>
                <IconButton size="small" edge="start" color="inherit" aria-label="logo">
                  <AccountCircleIcon />
                </IconButton>
                <Typography component="div">Profile</Typography>
              </Stack>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Stack direction="row" justifyContent="space-between" alignItems="flex-start" spacing={2} sx={{ display: "flex", alignItems: "center" }}>
                <IconButton size="small" edge="start" color="inherit" aria-label="logo">
                  <SettingsIcon />
                </IconButton>
                <Typography component="div">Settings</Typography>
              </Stack>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Stack onClick={handleLogout} direction="row" justifyContent="space-between" alignItems="flex-start" spacing={2} sx={{ display: "flex", alignItems: "center" }}>
                <IconButton size="small" edge="start" color="inherit" aria-label="logo">
                  <ExitToAppIcon />
                </IconButton>
                <Typography component="div">Logout</Typography>
              </Stack>
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </>
  );
}

export default MuiNavbar;
