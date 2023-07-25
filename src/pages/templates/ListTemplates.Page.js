import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// components
import MuiHeader from "../../components/MuiHeader";
import MuiLoader from "../../components/MuiLoader";

// thunks
import { get_all_templates, createVersionThunk, deleteVersionThunk, updateVersionThunk } from "./Template.Thunk";

// MUI
import { TextField, Avatar, Button, Box, Grid, Card, CardHeader, IconButton, Menu, MenuItem, useMediaQuery, useTheme, Dialog, DialogTitle, DialogContent, DialogActions, Slide } from "@mui/material";
import SettingsSystemDaydreamIcon from "@mui/icons-material/SettingsSystemDaydream";
import { orange } from "@mui/material/colors";
import ViewTemplate from "./ViewTemplate.Page";

// toastify
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// swal
import Swal from "sweetalert2";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function ListTemplatesPage() {
  const dispatch = useDispatch();

  // ------------ Grid gallery view -----------
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  // ---------------------------------------------

  const data = useSelector((state) => (state.TemplateSlice.data.data ? state.TemplateSlice.data.data : []));
  const loading = useSelector((state) => state.TemplateSlice.loading);
  const status = useSelector((state) => state.TemplateSlice.status);
  const message = useSelector((state) => state.TemplateSlice.message);

  useEffect(() => {
    dispatch(get_all_templates());
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
      //.then(() => dispatch(getVersionThunk()))
      .then(() => dispatch(cleardata))
      .then(toast.success("Data saved successfully"));
  };
  const updatedata = () => {
    const body = { _id: id, appname, package: packagename, version };
    dispatch(updateVersionThunk(body))
      //.then(() => dispatch(getVersionThunk()))
      .then(() => dispatch(cleardata))
      .then(toast.success("Data updated successfully"));
  };
  const deletedata = (id) => {
    dispatch(deleteVersionThunk(id))
      //.then(() => dispatch(getVersionThunk()))
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
  const [selectedTemplate, setSelectedTemplate] = useState({});
  const [openViewTemplate, setOpenViewTemplate] = useState(false);
  const open_viewtemplate_dialog = (template) => {
    setSelectedTemplate(template);
    setOpenViewTemplate(true);
  };
  const close_viewtemplate_dialog = () => {
    dispatch(get_all_templates());
    setOpenViewTemplate(false);
  };

  return (
    <>
      <MuiHeader header="Templates" />
      <div>{data.length} Template(s) found!</div>
      <div style={{ height: "380px", overflow: "auto" }}>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={3}>
            {data.map((template, index) => (
              <Grid item xs={12} sm={isSmallScreen ? 12 : 6} md={4} key={index}>
                <Card onClick={() => open_viewtemplate_dialog(template)} sx={{ maxWidth: 345 }}>
                  <CardHeader
                    className={template.default ? "default_template" : ""}
                    avatar={
                      <Avatar sx={{ bgcolor: orange[500] }}>
                        <SettingsSystemDaydreamIcon />
                      </Avatar>
                    }
                    title={<div style={{ cursor: "pointer" }}>{template.name}</div>}
                    subheader={
                      <>
                        <div style={{ cursor: "pointer" }}>{template.id ? template.id : ""}</div>
                        <div style={{ cursor: "pointer" }}>{template.language ? template.language : ""}</div>
                      </>
                    }
                  />
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </div>

      {/* View Template */}
      <ViewTemplate selectedTemplate={selectedTemplate} open={openViewTemplate} onClose={close_viewtemplate_dialog} />

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

export default ListTemplatesPage;
