import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { menus } from "../route/AppRoute";
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

// swal
import Swal from "sweetalert2";

function MuiNavbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleMenuClick = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to sign out?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      //cancelButtonColor: "#d33",
      confirmButtonText: "Yes, sign me out!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(logout());
      }
    });
  };

  return (
    <>
      <AppBar position="static" color="transparent" elevation={0}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Stack direction="row" spacing={2}>
              <div className="whatsappbot_heading">ThinkZone Bot</div>
            </Stack>
          </Typography>
          {menus.map((menu, index) => (
            <Button onClick={() => navigate(menu.navigateTo)}>{menu.text.toUpperCase()}</Button>
          ))}

          <Button onClick={handleLogout}>Logout</Button>
        </Toolbar>
      </AppBar>
    </>
  );
}

export default MuiNavbar;
