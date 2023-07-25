import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// components
import MuiHeader from "../../components/MuiHeader";
import MuiLoader from "../../components/MuiLoader";

// thunks
import { createVersionThunk, deleteVersionThunk, getVersionThunk, updateVersionThunk } from "./Version.Thunk";

// MUI
import { TextField, Avatar, Button, Box, Grid, Card, CardHeader, IconButton, Menu, MenuItem, useMediaQuery, useTheme, Dialog, DialogTitle, DialogContent, DialogActions, Slide } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AodIcon from "@mui/icons-material/Aod";
import { blue } from "@mui/material/colors";

// toastify
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// swal
import Swal from "sweetalert2";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function VersionPage() {
  const dispatch = useDispatch();

  // ------------ Grid gallery view -----------
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  // ---------------------------------------------

  // -------------- Card-item vertical menu ---------------
  const ITEM_HEIGHT = 48;
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [selectedApp, setSelectedApp] = useState({});
  const [anchorEl, setAnchorEl] = useState(null);
  const openVertMenu = Boolean(anchorEl);
  const handleVertMenuClick = (event, app, index) => {
    setAnchorEl(event.currentTarget);
    setSelectedIndex(index);
    setSelectedApp(app);
  };
  const handleVertMenuClose = () => {
    setAnchorEl(null);
    setSelectedIndex(-1);
    setSelectedApp({});
  };
  // ---------------------------------------------

  const data = useSelector((state) => state.VersionSlice.data);
  const loading = useSelector((state) => state.VersionSlice.loading);
  const status = useSelector((state) => state.VersionSlice.status);
  const message = useSelector((state) => state.VersionSlice.message);

  useEffect(() => {
    dispatch(getVersionThunk());
  }, [dispatch]);

  // ------------------ form data -----------------------
  const [isUpdate, setIsUpdate] = useState(false);
  const [id, setId] = useState("");
  const [appname, setAppname] = useState("");
  const [packagename, setPackagename] = useState("");
  const [version, setVersion] = useState("");
  const [disableAppname, setDisableAppname] = useState(false);
  const [disablePackagename, setDisablePackagename] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  // ----------------------------------------------------

  // --------- add , update , delete button click events  ---------
  const create_app_button_click = () => {
    cleardata();
    setModalTitle("New App Details");
    setOpenModal(true);
  };
  const update_app_button_click = (params) => {
    setModalTitle("Update App Details");
    setIsUpdate(true);
    setId(params._id);
    setAppname(params.appname);
    setPackagename(params.package);
    setVersion(params.version);
    setDisableAppname(true);
    setDisablePackagename(true);
    setOpenModal(true);
    handleVertMenuClose();
  };

  const delete_app_button_click = (id) => {
    handleVertMenuClose();
    Swal.fire({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this record!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      //cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deletedata(id);
      }
    });
  };
  // -----------------------------------------------------

  // -------------------- Modal -----------------------
  const [openModal, setOpenModal] = useState(false);
  // -----------------------------------------------------

  // ---------- modal cancle , save button click events -------------
  const modal_cancle_button_click = (params) => {
    cleardata();
    setOpenModal(false);
  };
  const modal_save_button_click = (params) => {
    console.log("isUpdate: ", isUpdate);
    if (appname === undefined || appname === null || appname.length <= 0) toast.error("Enter app name");
    else if (packagename === undefined || packagename === null || packagename.length <= 0) toast.error("Enter package name");
    else if (version === undefined || version === null || version.length <= 0) toast.error("Enter version");
    else {
      if (isUpdate) updatedata();
      else savedata();
      setOpenModal(false);
    }
  };
  // -----------------------------------------------------

  // ----------------- save , update , delete , clear operations ----------

  const savedata = () => {
    const body = { appname, package: packagename, version };
    // Daisy chaining
    dispatch(createVersionThunk(body))
      .then(() => dispatch(getVersionThunk()))
      .then(() => dispatch(cleardata))
      .then(toast.success("Data saved successfully"));
  };
  const updatedata = () => {
    const body = { _id: id, appname, package: packagename, version };
    dispatch(updateVersionThunk(body))
      .then(() => dispatch(getVersionThunk()))
      .then(() => dispatch(cleardata))
      .then(toast.success("Data updated successfully"));
  };
  const deletedata = (id) => {
    dispatch(deleteVersionThunk(id))
      .then(() => dispatch(getVersionThunk()))
      .then(() => dispatch(cleardata))
      .then(toast.success("Data removed successfully"));
  };
  const cleardata = () => {
    setIsUpdate(false);
    setId("");
    setAppname("");
    setPackagename("");
    setVersion("");
    setDisableAppname(false);
    setDisablePackagename(false);
  };

  // ----------------------------------------------------

  return (
    <>
      <MuiHeader header="Versions" />
      <div>
        <Button onClick={create_app_button_click} variant="contained" disabled={loading}>
          Create New
        </Button>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={3}>
            {data.map((app, index) => (
              <Grid item xs={12} sm={isSmallScreen ? 12 : 6} md={4} key={index}>
                <Card sx={{ maxWidth: 345 }}>
                  <CardHeader
                    avatar={
                      <Avatar sx={{ bgcolor: blue[500] }}>
                        <AodIcon />
                      </Avatar>
                    }
                    action={
                      <>
                        <IconButton id={index + 1.1} onClick={(e) => handleVertMenuClick(e, app, index)} aria-controls={openVertMenu ? { index } : undefined} aria-expanded={openVertMenu ? "true" : undefined} aria-haspopup="true">
                          <MoreVertIcon />
                        </IconButton>
                      </>
                    }
                    title={<div style={{ cursor: "pointer" }}>{app.appname}</div>}
                    subheader={
                      <>
                        <div style={{ cursor: "pointer" }}>{app.package ? app.package : ""}</div>
                        <div style={{ cursor: "pointer" }}>{app.version ? app.version : ""}</div>
                      </>
                    }
                  />
                  {/* <CardMedia component="img" height="194" image={require("../../media/images/content.webp")} alt="content" />
                  <CardContent></CardContent> */}
                </Card>
              </Grid>
            ))}
            <Menu
              id={selectedIndex}
              anchorEl={anchorEl}
              open={openVertMenu}
              onClose={handleVertMenuClose}
              MenuListProps={{
                "aria-labelledby": "vert-button",
              }}
              PaperProps={{
                style: {
                  maxHeight: ITEM_HEIGHT * 4.5,
                  width: "20ch",
                },
              }}
            >
              <MenuItem onClick={() => update_app_button_click(selectedApp)}>Edit</MenuItem>
              <MenuItem onClick={() => delete_app_button_click(selectedApp._id)}>Delete</MenuItem>
            </Menu>
          </Grid>
        </Box>
      </div>

      {/* Loader */}
      <MuiLoader open={loading} />

      {/* Toaster */}
      <ToastContainer />

      {/* save or update modal */}
      <Dialog open={openModal} TransitionComponent={Transition} keepMounted onClose={modal_cancle_button_click} aria-describedby="alert-dialog-slide-description">
        <DialogTitle>{modalTitle}</DialogTitle>
        <DialogContent>
          <TextField disabled={disableAppname} id="appname" label="App Name" name="appname" value={appname} onChange={(e) => setAppname(e.target.value)} autoComplete="appname" margin="normal" required fullWidth autoFocus />
          <TextField disabled={disablePackagename} id="packagename" label="App Name" name="packagename" value={packagename} onChange={(e) => setPackagename(e.target.value)} autoComplete="packagename" margin="normal" required fullWidth autoFocus />
          <TextField id="version" label="App Name" name="version" value={version} onChange={(e) => setVersion(e.target.value)} autoComplete="version" margin="normal" required fullWidth autoFocus />
        </DialogContent>
        <DialogActions>
          <Button onClick={modal_cancle_button_click}>Cancle</Button>
          <Button onClick={modal_save_button_click}>Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default VersionPage;
