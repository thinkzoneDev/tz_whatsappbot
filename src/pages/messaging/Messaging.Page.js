import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { get_process_status, get_default_template, send_templated_media_message } from "./Messaging.Thunk";
import { Button, Dialog, Divider, AppBar, Toolbar, IconButton, Typography, Slide, Grid } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import MuiLoader from "../../components/MuiLoader";

// toastify
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// swal
import Swal from "sweetalert2";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function MessagingPage({ open, onClose }) {
  const dispatch = useDispatch();
  const inputFileRef = useRef();

  const data = useSelector((state) => state.MessagingSlice.data);
  const loading = useSelector((state) => state.MessagingSlice.loading);
  const default_template = data.data ? data.data[0] : {};

  const process_status_data = useSelector((state) => state.MessagingSlice.processdata);
  const process_status = process_status_data.data ? process_status_data.data.is_process_running : false;

  const close_messaging_page = () => {
    onClose();
  };

  useEffect(() => {
    dispatch(get_process_status(localStorage.getItem("userid")));
    dispatch(get_default_template());
  }, [dispatch]);

  let components = default_template ? (default_template.components ? default_template.components : []) : [];
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

  // --------------------- csv file -------------------
  const [selectedCSVFile, setSelectedCSVFile] = useState(null);
  const [contacts, setContacts] = useState([]);
  let contacts_array = [];

  const csv_file_on_change = (event) => {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      if (file.type === "text/csv") {
        readCSV(file);
      } else {
        setSelectedCSVFile(null);
        alert("Please select a CSV file");
      }
    } else {
      setSelectedCSVFile(null);
    }
  };

  const readCSV = (file) => {
    contacts_array = [];
    const reader = new FileReader();
    reader.onload = (e) => {
      const contents = e.target.result;
      const rows = contents.split("\r\n");
      rows.forEach((row) => {
        const values = row.split(",");
        const value = values ? values[0] : "";
        if (value.length >= 10) contacts_array.push(values[0]);
      });
      setContacts(contacts_array);
    };
    reader.readAsText(file);
    setSelectedCSVFile(file);
  };
  // --------------------------------------------------

  const send_message_on_click = () => {
    var userid = localStorage.getItem("userid");
    if (userid == undefined || userid == null || userid.trim == "") toast.error("User not found");
    else if (contacts.length <= 0) toast.error("No contacts found");
    else {
      // save opration started
      const body = {
        userid: localStorage.getItem("userid"),
        template_name: default_template.name,
        template_language: default_template.language,
        template_type: default_template.mediatype,
        template_media_url: default_template.mediaurl,
        contacts,
      };
      dispatch(send_templated_media_message(body));
      // save operation end

      inputFileRef.current.value = ""; // clear selected file
      close_messaging_page();
      Swal.fire({
        title: "Message sent",
        text: "This process will take some time. Please check after some time.",
        icon: "success",
        //showCancelButton: true,
        //confirmButtonColor: "#d33",
        //cancelButtonColor: "#d33",
        //confirmButtonText: "Got it!",
      });
    }
  };

  return (
    <>
      <Dialog fullScreen open={open} onClose={close_messaging_page} TransitionComponent={Transition}>
        <AppBar sx={{ position: "relative" }} color="transparent" elevation={0}>
          <Toolbar>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Send Templated Message
            </Typography>
            <div autoFocus color="inherit" onClick={close_messaging_page}>
              <IconButton edge="start" color="inherit" aria-label="close">
                <CloseIcon />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
        <div className="page_container">
          {process_status && <div>Your Process is running. Please wait for some time.</div>}
          {!process_status && (
            <div>
              <div>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <div className="template_frame">
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <div className="template_main_title">{default_template.name}</div>
                        </Grid>
                        <Grid item xs={4}>
                          <div className="template_sub_title template_sub_title_lightgreen">{default_template.status}</div>
                        </Grid>
                        <Grid item xs={4}>
                          <div className="template_sub_title template_sub_title_orange">{default_template.language}</div>
                        </Grid>
                        <Grid item xs={4}>
                          <div className="template_sub_title template_sub_title_purple">{header}</div>
                        </Grid>
                      </Grid>

                      <div className="template_mwssage_body">
                        <div className="vertically_horizontally_center">
                          <img src={default_template.thumburl} alt="No media" width={300} />
                        </div>
                        <div>{body}</div>
                      </div>
                      <div className="template_mwssage_body">{footer}</div>
                      <div className="template_button">{buttons}</div>
                    </div>
                  </Grid>
                  <Grid item xs={3}>
                    <div>
                      <div>Select contacts csv file</div>
                      <div>
                        <input type="file" accept="text/csv" onChange={csv_file_on_change} ref={inputFileRef} />
                      </div>
                      <div>{contacts.length} Contact(s)</div>
                      <div className="contacts_div">
                        {contacts.map((contact) => (
                          <div key={contact}>{contact}</div>
                        ))}
                      </div>
                    </div>
                  </Grid>
                  <Grid item xs={3}>
                    <div>
                      <Button color="primary" variant="contained" onClick={send_message_on_click}>
                        Send Message
                      </Button>
                    </div>
                  </Grid>
                </Grid>
              </div>
            </div>
          )}
        </div>
      </Dialog>

      {/* Loader */}
      {/* <MuiLoader open={loading} /> */}

      {/* Toaster */}
      <ToastContainer />
    </>
  );
}

export default MessagingPage;
