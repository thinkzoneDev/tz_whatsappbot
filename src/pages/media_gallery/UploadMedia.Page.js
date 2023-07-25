import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Button, Dialog, Divider, AppBar, Toolbar, IconButton, Typography, Slide, Grid } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import { save_media } from "./Media.Thunk";

// toastify
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import AWS from "aws-sdk";
import { Buffer } from "buffer";
Buffer.from("anything", "base64");

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

// ------------------ AWS S3 Configurations --------------------
console.log("-----------env: ", process.env.REACT_APP_S3_BUCKET);
const S3_BUCKET = process.env.REACT_APP_S3_BUCKET;
const REGION = process.env.REACT_APP_REGION;
const ACCESS_KEY = process.env.REACT_APP_ACCESS_KEY;
const SECRET_ACCESS_KEY = process.env.REACT_APP_SECRET_ACCESS_KEY;

AWS.config.update({
  accessKeyId: ACCESS_KEY,
  secretAccessKey: SECRET_ACCESS_KEY,
});
const S3 = new AWS.S3({
  region: REGION,
  accessKeyId: ACCESS_KEY,
  secretAccessKey: SECRET_ACCESS_KEY,
});
// -------------------------------------------------------------

function UploadMediaPage({ open, onClose }) {
  const dispatch = useDispatch();

  const videoInput = useRef();
  const videoElemRef = useRef();
  const inputFileRef = useRef();

  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFileNameWithExtension, setSelectedFileNameWithExtension] = useState(null);
  const [selectedFileNameWithoutExtension, setSelectedFileNameWithoutExtension] = useState(null);
  const [selectedFileExtension, setSelectedFileExtension] = useState(null);
  const [selectedFileType, setSelectedFileType] = useState(null);
  const [selectedFileSize, setSelectedFileSize] = useState(null);

  const [progress, setProgress] = useState(0);

  let mediatype = "";
  let mediaurl = "";
  let thumburl = "";
  const [videoThumbnail, setVideoThumbnail] = useState();

  const [mediatypeRadio, setMediatypeRadio] = useState("image");
  const mediatype_radio_on_change = (event) => {
    setMediatypeRadio(event.target.value);
  };

  const close_uploadmedia_page = () => {
    onClose();
  };

  const file_on_change = (event) => {
    setSelectedFile(event.target.files[0]);

    setSelectedFileNameWithExtension(event.target.files[0].name);
    setSelectedFileType(event.target.files[0].type);
    setSelectedFileSize(event.target.files[0].size);

    var regEx = /(?:\.([^.]+))?$/;
    var ext = regEx.exec(event.target.files[0].name)[1];
    setSelectedFileExtension(ext);

    setSelectedFileNameWithoutExtension(event.target.files[0].name.replace(/\.[^/.]+$/, ""));
  };

  const get_video_thumbnail = () => {
    if (videoElemRef.current) {
      const canvas = document.createElement("canvas");
      //canvas.width = videoElemRef.current.videoWidth;
      //canvas.height = videoElemRef.current.videoHeight;
      //canvas.getContext("2d").drawImage(videoElemRef.current, 0, 0, videoElemRef.current.videoWidth, videoElemRef.current.videoHeight);

      const w = 300;
      const h = 150;
      canvas.width = w;
      canvas.height = h;
      canvas.getContext("2d").drawImage(videoElemRef.current, 0, 0, w, h);

      setVideoThumbnail(canvas.toDataURL(), "image.png");
      fetch(videoThumbnail)
        .then((res) => res.blob())
        .then((blob) => {
          const NewFile = new File([blob], "video_thumbnail", {
            type: "image/png",
          });
          console.log(NewFile);
        });
    } else {
      toast.error("Select Video");
    }
  };

  const upload_file = async () => {
    console.log("-->videoThumbnail- ", !videoThumbnail);
    console.log("-->selectedFile- ", selectedFile);
    console.log("-->selectedFileNameWithExtension- ", selectedFileNameWithExtension);
    console.log("-->selectedFileNameWithoutExtension- ", selectedFileNameWithoutExtension);
    console.log("-->selectedFileExtension- ", selectedFileExtension);
    console.log("-->selectedFileType- ", selectedFileType);
    console.log("-->selectedFileSize- ", selectedFileSize);

    if (!selectedFile) toast.error("No File Selected");
    else if (selectedFileSize > 4194304) toast.error("File size exceed");
    else {
      if (selectedFileType == "video/mp4") {
        if (!videoThumbnail) toast.error("Generate Thumbnail");
        else await upload_video();
      } else if (selectedFileType == "image/png" || selectedFileType == "image/gif" || selectedFileType == "image/jpeg") {
        await upload_image();
      } else {
        console.log("Invalid file format");
      }
    }
  };

  const upload_image = async () => {
    setLoading(true);
    mediatype = "image";
    const params = {
      ACL: "public-read",
      Bucket: S3_BUCKET,
      Key: selectedFile.name,
      Body: selectedFile,
      ContentType: "image/jpeg",
    };
    const request = await S3.putObject(params);
    request.on("httpUploadProgress", (evt) => {
      setProgress(Math.round((evt.loaded / evt.total) * 100));
    });
    request.send(async (err, data) => {
      if (err) {
        console.log("Error uploading file:", err);
      } else {
        console.log("File uploaded successfully:", data);
        const url = `https://${params.Bucket}.S3.${S3.config.region}.amazonaws.com/${params.Key}`;
        mediaurl = url;
        thumburl = url;
        await save_data_into_database();
      }
    });
  };

  const upload_video = async () => {
    console.log("1. uploading video");
    setLoading(true);
    mediatype = "video";
    const params = {
      ACL: "public-read",
      Bucket: S3_BUCKET,
      Key: selectedFile.name,
      Body: selectedFile,
      ContentType: "video/mp4",
    };
    const request = await S3.putObject(params);
    request.on("httpUploadProgress", (evt) => {
      setProgress(Math.round((evt.loaded / evt.total) * 100));
    });
    request.send(async (err, data) => {
      if (err) {
        console.log("Error uploading file:", err);
      } else {
        console.log("File uploaded successfully:", data);
        // construct the URL of the uploaded file
        const url = `https://${params.Bucket}.S3.${S3.config.region}.amazonaws.com/${params.Key}`;
        mediaurl = url;
        await upload_thumbnail();
      }
    });
  };

  const upload_thumbnail = async () => {
    console.log("2. uploading thumb");
    setLoading(true);
    var buf = Buffer.from(videoThumbnail.replace(/^data:image\/\w+;base64,/, ""), "base64");
    var params = {
      ACL: "public-read",
      Bucket: S3_BUCKET,
      Key: selectedFileNameWithoutExtension + ".jpeg",
      Body: buf,
      ContentEncoding: "base64",
      ContentType: "image/jpeg",
    };
    const request = await S3.putObject(params);
    request.on("httpUploadProgress", (evt) => {
      setProgress(Math.round((evt.loaded / evt.total) * 100));
    });
    request.send(async (err, data) => {
      if (err) {
        console.log("Error uploading file:", err);
      } else {
        console.log("File uploaded successfully:", data);
        // construct the URL of the uploaded file
        const url = `https://${params.Bucket}.S3.${S3.config.region}.amazonaws.com/${params.Key}`;
        thumburl = url;
        await save_data_into_database();
      }
    });
  };

  const save_data_into_database = async () => {
    setLoading(true);
    console.log("3. save data: ", { mediatype, mediaurl, thumburl });
    const body = { mediatype, mediaurl, thumburl };
    // Daisy chaining
    await dispatch(save_media(body));
    await reset();
  };

  const reset = () => {
    console.log("4. reset all");
    setLoading(false);
    mediatype = "";
    mediaurl = "";
    thumburl = "";
    setProgress(0);
    setSelectedFile(null);
    setSelectedFileNameWithExtension(null);
    setSelectedFileNameWithoutExtension(null);
    setSelectedFileExtension(null);
    setSelectedFileType(null);
    setSelectedFileSize(null);
    setVideoThumbnail(null);
    inputFileRef.current.value = "";
  };

  return (
    <>
      <Dialog fullScreen open={open} onClose={close_uploadmedia_page} TransitionComponent={Transition}>
        <AppBar sx={{ position: "relative" }} color="transparent" elevation={0}>
          <Toolbar>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Upload Media
            </Typography>
            <div autoFocus color="inherit" onClick={close_uploadmedia_page}>
              <IconButton edge="start" color="inherit" aria-label="close">
                <CloseIcon />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
        <div className="page_container">
          {loading && <div>Loading ..</div>}
          <div onChange={mediatype_radio_on_change}>
            <input type="radio" name="radio_mediatype" value="image" checked={mediatypeRadio == "image"} onChange={(e) => {}} />
            Image
            <input type="radio" name="radio_mediatype" value="video" checked={mediatypeRadio == "video"} onChange={(e) => {}} />
            Video
          </div>
          <Button variant="contained" color="primary" onClick={upload_file}>
            Upload File
          </Button>
          {progress > 0 && <div>Upload Progress: {progress}%</div>}

          {mediatypeRadio == "image" && (
            <div>
              <Grid container spacing={2}>
                <Grid item xs={3}>
                  <div>
                    <input type="file" accept="image/*" onChange={file_on_change} ref={inputFileRef} />
                  </div>
                </Grid>
              </Grid>
              {mediaurl && (
                <div>
                  S3 URL: {mediaurl}
                  <img src={mediaurl} />
                </div>
              )}
            </div>
          )}
          {mediatypeRadio == "video" && (
            <div>
              <Grid container spacing={2}>
                <Grid item xs={3}>
                  <div>
                    <div className="media_frame">{selectedFile ? <video id="video" className="media_frame" ref={videoElemRef} src={URL.createObjectURL(selectedFile)} type="video/mp4" controls></video> : ""}</div>
                    <div>
                      <input type="file" accept="video/*" onChange={file_on_change} ref={inputFileRef} />
                    </div>
                  </div>
                </Grid>
                <Grid item xs={3}>
                  <div>
                    <Button variant="outlined" onClick={get_video_thumbnail}>
                      Generate Thumbnail
                    </Button>
                  </div>
                </Grid>
                <Grid item xs={3}>
                  <div>
                    {videoThumbnail ? (
                      <div>
                        <img className="media_frame" src={videoThumbnail} alt="" />
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </Grid>
                <Grid item xs={3}>
                  <div></div>
                </Grid>
              </Grid>

              {mediaurl && (
                <div>
                  S3 URL: {mediaurl}
                  <img src={mediaurl} />
                </div>
              )}
            </div>
          )}
        </div>
      </Dialog>

      {/* Toaster */}
      <ToastContainer />
    </>
  );
}

export default UploadMediaPage;
