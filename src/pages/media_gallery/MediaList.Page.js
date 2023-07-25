import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { get_all_media } from "./Media.Thunk";

import { Button, Grid, Paper } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: 10,
    textAlign: "center",
    color: "black",
  },
}));

function MediaListPage({ mediatype, onSelect }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(get_all_media());
  }, []);
  const data = useSelector((state) => state.MediaSlice.data);
  const allmediadata = data.data ? data.data : [];
  const imagemediadata = allmediadata ? allmediadata.filter((item) => item.mediatype === "image") : [];
  const videomediadata = allmediadata ? allmediadata.filter((item) => item.mediatype === "video") : [];

  const media_on_click = (media) => {
    let obj = { mediatype: media.mediatype, mediaurl: media.mediaurl, thumburl: media.thumburl };
    onSelect(obj);
  };

  return (
    <>
      <div className={classes.root}>
        {/* <div>{allmediadata.length} media(s) found</div> */}
        <Grid container spacing={2}>
          {/* {mediatype === "all" &&
            allmediadata.map((media, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Paper className={classes.paper}>
                  <div onClick={() => media_on_click(media)}>
                    <img src={media.thumburl} width="100%" />
                  </div>
                </Paper>
              </Grid>
            ))} */}

          {mediatype === "image" &&
            imagemediadata.map((media, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Paper className={classes.paper}>
                  <div onClick={() => media_on_click(media)}>
                    <img src={media.thumburl} width="100%" />
                  </div>
                </Paper>
              </Grid>
            ))}

          {mediatype === "video" &&
            videomediadata.map((media, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Paper className={classes.paper}>
                  <div onClick={() => media_on_click(media)}>
                    <img src={media.thumburl} width="100%" />
                  </div>
                </Paper>
              </Grid>
            ))}
        </Grid>
      </div>
    </>
  );
}

export default MediaListPage;
