import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import ShowMediaDialogPage from "./ShowMediaDialog.Page";
import { get_all_templates, update_template } from "./Template.Thunk";

import { Button, Dialog, Divider, AppBar, Toolbar, IconButton, Typography, Slide, Grid } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

// toastify
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// swal
import Swal from "sweetalert2";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ViewTemplatePage({ selectedTemplate, open, onClose }) {
  const dispatch = useDispatch();
  const [showMediaDialog, setShowMediaDialog] = useState(false);
  const [mediatype, setMediatype] = useState("");
  const [selectedMediatype, setSelectedMediatype] = useState("");
  const [selectedMediaurl, setSelectedMediaurl] = useState("");
  const [selectedThumburl, setSelectedThumburl] = useState("");

  let components = selectedTemplate.components ? selectedTemplate.components : [];
  let header = "";
  let body = "";
  let footer = "";
  let buttons = "";

  components.map((component) => {
    if (component.type.toLowerCase() == "header") header = component.format;
    if (component.type.toLowerCase() == "body") body = component.text;
    if (component.type.toLowerCase() == "footer") footer = component.text;
    if (component.type.toLowerCase() == "buttons") buttons = "buttons";
  });

  const close_viewtemplate_dialog = () => {
    reset();
    onClose();
  };

  const media_on_click = (media) => {
    //alert(JSON.stringify(media));
    setSelectedMediatype(media.mediatype);
    setSelectedMediaurl(media.mediaurl);
    setSelectedThumburl(media.thumburl);
    close_media_dialog();
  };

  const open_media_dialog = () => {
    setMediatype(header);
    setShowMediaDialog(true);
  };

  const close_media_dialog = () => {
    setShowMediaDialog(false);
  };

  const set_default_template = () => {
    //if (selectedTemplate) alert("This is already set as dfault");
    if (selectedMediatype == "") toast.error("No Media type found");
    else if (selectedMediaurl == "") toast.error("No Media Selected");
    else if (selectedThumburl == "") toast.error("No Thumbnail Found");
    else {
      // set default operation start
      var templateid = selectedTemplate.id;
      var body = {
        mediatype: selectedMediatype,
        mediaurl: selectedMediaurl,
        thumburl: selectedThumburl,
        default: true,
      };
      dispatch(update_template({ templateid, body }));
      // set default operation end

      close_viewtemplate_dialog();
      Swal.fire({
        title: "Default set",
        text: "This Template is set as default.",
        icon: "success",
        //showCancelButton: true,
        //confirmButtonColor: "#d33",
        //cancelButtonColor: "#d33",
        confirmButtonText: "OK",
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch(get_all_templates());
        }
      });
    }
  };

  const reset = () => {
    setShowMediaDialog(false);
    setMediatype("");
    setSelectedMediatype("");
    setSelectedMediaurl("");
    setSelectedThumburl("");

    components = [];
    header = "";
    body = "";
    footer = "";
    buttons = "";
  };

  return (
    <div>
      <Dialog fullScreen open={open} onClose={close_viewtemplate_dialog} TransitionComponent={Transition}>
        <AppBar sx={{ position: "relative" }} color="transparent" elevation={0}>
          <Toolbar>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              {selectedTemplate.name}
            </Typography>
            <div autoFocus color="inherit" onClick={close_viewtemplate_dialog}>
              <IconButton edge="start" color="inherit" aria-label="close">
                <CloseIcon />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
        <div>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <div className="template_frame">
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <div className="template_main_title">{selectedTemplate.name}</div>
                  </Grid>
                  <Grid item xs={4}>
                    <div className="template_sub_title template_sub_title_lightgreen">{selectedTemplate.status}</div>
                  </Grid>
                  <Grid item xs={4}>
                    <div className="template_sub_title template_sub_title_orange">{selectedTemplate.language}</div>
                  </Grid>
                  <Grid item xs={4}>
                    <div className="template_sub_title template_sub_title_purple">{header}</div>
                  </Grid>
                </Grid>

                <div className="template_mwssage_body">
                  <div className="vertically_horizontally_center">
                    <img src={selectedTemplate.thumburl} alt="No media" width={300} />
                  </div>
                  <div>{body}</div>
                </div>
                <div className="template_mwssage_body">{footer}</div>
                <div className="template_button">{buttons}</div>
              </div>
            </Grid>
            <Grid item xs={4}>
              <div>
                <div className="template_main_title">Add/Change Media</div>
                <div className="media_frame media_margin">
                  <div className="vertically_horizontally_center">
                    <img src={selectedThumburl} alt="No media" width={300} />
                  </div>
                </div>
                <div className="button_position_at_start">
                  <Button variant="outlined" size="small" onClick={open_media_dialog}>
                    Choose Media
                  </Button>
                </div>
              </div>
            </Grid>
            <Grid item xs={2}>
              <div className="button_position_at_start media_margin">
                <Button variant="contained" size="large" color="primary" onClick={set_default_template}>
                  Set as Default
                </Button>
              </div>
            </Grid>
          </Grid>
        </div>
      </Dialog>

      {/* Media List */}
      <ShowMediaDialogPage mediatype={mediatype} open={showMediaDialog} onSelect={media_on_click} onClose={close_media_dialog} />

      {/* Toaster */}
      <ToastContainer />
    </div>
  );
}
