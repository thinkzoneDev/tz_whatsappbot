import React, { useState } from "react";
import MediaListPage from "./MediaList.Page";
import MuiHeader from "../../components/MuiHeader";

import { Button, Grid } from "@mui/material";
import UploadMediaPage from "./UploadMedia.Page";

const MediaGalleryPage = () => {
  const [showUploadMediaPage, setShowUploadMediaPage] = useState(false);
  const [mediatypeRadio, setMediatypeRadio] = useState("image");

  const open_uploadmedia_page = () => {
    setShowUploadMediaPage(true);
  };
  const close_uploadmedia_page = () => {
    setShowUploadMediaPage(false);
  };

  const mediatype_radio_on_change = (event) => {
    setMediatypeRadio(event.target.value);
  };

  const media_on_click = (media) => {
    alert(JSON.stringify(media));
  };

  return (
    <>
      <MuiHeader header="Gallery" />
      <div>
        <Grid container spacing={2}>
          <Grid item xs={9}>
            <div onChange={mediatype_radio_on_change}>
              {/* <input type="radio" name="radio_mediatype" value="all" checked={mediatypeRadio == "all"} onChange={(e) => {}} />
              All */}
              <input type="radio" name="radio_mediatype" value="image" checked={mediatypeRadio == "image"} onChange={(e) => {}} />
              Image
              <input type="radio" name="radio_mediatype" value="video" checked={mediatypeRadio == "video"} onChange={(e) => {}} />
              Video
            </div>
          </Grid>
          <Grid item xs={3}>
            <div>
              <Button variant="outlined" onClick={open_uploadmedia_page}>
                Upload Media
              </Button>
            </div>
          </Grid>
        </Grid>
      </div>

      <MediaListPage mediatype={mediatypeRadio} onSelect={media_on_click} />
      <UploadMediaPage open={showUploadMediaPage} onClose={close_uploadmedia_page} />
    </>
  );
};

export default MediaGalleryPage;
