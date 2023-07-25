import { Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

function MuiHeader({ header, manage_nsdc, nsdc_certificate }) {
  return (
    <>
      <div className="title-header">{header.toUpperCase()}</div>
      <div style={{ marginTop: -45, marginRight: 125 }}>
        <Link to="/manage_nsdc">
          <Button style={{ paddingLeft: 29 }}>{manage_nsdc}</Button>
        </Link>

        <Link to="/nsdccert">
          <Button>{nsdc_certificate}</Button>
        </Link>
      </div>
    </>
  );
}

export default MuiHeader;
