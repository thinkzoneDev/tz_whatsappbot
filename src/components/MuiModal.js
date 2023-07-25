import React from "react";
import { Grid, Button, Typography, Modal, Stack, Box, IconButton } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import WarningIcon from "@mui/icons-material/Warning";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "1px solid #525151",
  borderRadius: "5px",
  boxShadow: 24,
  p: 4,
};

function MuiModal({ message, modalType, modalVariant, isOpen, onClose }) {
  const Header = () => {
    let title = "Info";
    let icon = <InfoIcon color="primary" />;
    if (modalType === "info") {
      title = "Info";
      icon = <InfoIcon color="primary" />;
    } else if (modalType === "warning") {
      title = "Warning";
      icon = <WarningIcon color="warning" />;
    } else if (modalType === "error") {
      title = "Error";
      icon = <CancelIcon color="error" />;
    } else if (modalType === "success") {
      title = "Success";
      icon = <CheckCircleIcon color="success" />;
    } else {
      title = "Info";
      icon = <InfoIcon color="primary" />;
    }

    return (
      <Stack
        direction="row"
        style={{
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        {icon}&nbsp;&nbsp;
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {title}
        </Typography>
      </Stack>
    );
  };

  const Body = () => {
    return (
      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
        {message}
      </Typography>
    );
  };

  const Footer = () => {
    const buttons =
      modalVariant === "confirm" ? (
        <>
          <Button onClick={onClose} value="0">
            No
          </Button>
          <Button onClick={onClose} value="1">
            Yes
          </Button>
        </>
      ) : (
        <>
          <Button onClick={onClose} value="1">
            Ok
          </Button>
        </>
      );

    return (
      <Grid container justifyContent="flex-end">
        {buttons}
      </Grid>
    );
  };

  return (
    isOpen && (
      <>
        <Modal open={isOpen} onClose={onClose} value="0" aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
          <Box sx={style}>
            <Header />
            <Body />
            <Footer />
          </Box>
        </Modal>
      </>
    )
  );
}

export default MuiModal;
