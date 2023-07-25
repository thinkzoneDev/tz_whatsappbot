import React, { useState } from "react";
import { AppBar, Avatar, Toolbar, Drawer, Box, Typography, IconButton, Stack, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import avatar from "./../assets/images/logo.png";
import AppsIcon from "@mui/icons-material/Apps";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import { menus } from "../route/AppRoute";
import MuiSearch from "./MuiSearch";

function MuiDrawer() {
  const navigate = useNavigate();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // ------------------- Search menu events -------------------
  const [searchText, setSearchText] = useState("");
  const [filteredMenu, setFilteredMenu] = useState(menus);

  const searchTextOnChange = (event) => {
    setSearchText(event.target.value);
    const searchResults = menus.filter((item) => item.text.toLowerCase().includes(event.target.value.toLowerCase()));
    setFilteredMenu(searchResults);
  };
  // ----------------------------------------------------------

  // ----------------- Menu on click events ------------------
  const handleMenuItemClick = (navigateTo) => {
    navigate(navigateTo);
    setIsDrawerOpen(false);
    setSearchText("");
    setFilteredMenu(menus);
  };
  // ---------------------------------------------------------

  // ----------------- Populate menu list --------------------
  const drawermenus = (
    <div style={{ height: "75vh", overflowX: "hidden", overflowY: "scroll" }}>
      <List>
        {filteredMenu.map((menu, index) => (
          <ListItem key={menu.text} onClick={() => handleMenuItemClick(menu.navigateTo)} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <AppsIcon />
              </ListItemIcon>
              <ListItemText primary={menu.text.toUpperCase()} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );
  // ---------------------------------------------------------

  return (
    <>
      <IconButton onClick={() => setIsDrawerOpen(true)} size="large" edge="start" color="inherit" aria-label="logo">
        <MenuIcon />
      </IconButton>
      <Drawer
        PaperProps={{
          sx: { width: "35%" },
        }}
        anchor="left"
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <Box p={0} width="100%" role="presentation" textAlign="center">
              <Stack direction="row" justifyContent="space-between" alignItems="flex-start" spacing={2} sx={{ display: "flex", alignItems: "center" }}>
                <Avatar sx={{ m: 1, bgcolor: "secondary.main", width: 33, height: 33 }}>
                  {/* <LockOutlinedIcon /> */}
                  <Avatar alt="Logo" src={avatar} />
                </Avatar>

                <IconButton onClick={() => setIsDrawerOpen(false)} size="large" edge="end" color="inherit" aria-label="logo">
                  <CloseIcon />
                </IconButton>
              </Stack>
            </Box>
          </Toolbar>
        </AppBar>
        <MuiSearch searchText={searchText} searchTextOnChange={searchTextOnChange} />
        {drawermenus}
      </Drawer>
    </>
  );
}

export default MuiDrawer;
