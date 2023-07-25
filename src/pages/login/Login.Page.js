import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// components
import MuiLoader from "../../components/MuiLoader";

// MUI
import { Avatar, Button, CssBaseline, TextField, Link, Box, Typography, Container, createTheme, ThemeProvider } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import avatar from "./../../assets/images/logo.png";

// Thunk
import { authenticateUserThunk } from "./Login.Thunk";

// toastify
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const theme = createTheme();
function LoginPage() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const loading = useSelector((state) => state.LoginSlice.loading);
  const status = useSelector((state) => state.LoginSlice.status);
  const message = useSelector((state) => state.LoginSlice.message);

  const login_button_click = () => {
    if (!email) {
      toast.error("Please enter a valid emailid");
    } else if (!password) {
      toast.error("Please enter a valid password");
    } else {
      const user = {
        userid: email,
        password,
      };
      dispatch(authenticateUserThunk(user)).then(toast(message));
    }
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main", width: 42, height: 42 }}>
              {/* <LockOutlinedIcon /> */}
              <Avatar alt="Logo" src={avatar} />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box noValidate sx={{ mt: 1 }}>
              <TextField id="email" label="Email Address" name="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" margin="normal" required fullWidth autoFocus />
              <TextField id="password" label="Password" name="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" margin="normal" required fullWidth />
              <div className="text-center text-md-start mt-4 pt-2">
                <Button onClick={login_button_click} fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                  Sign In
                </Button>
              </div>
            </Box>
          </Box>

          {/* Copyright */}
          <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 8, mb: 4 }}>
            {"Copyright © "}
            <Link color="inherit" href="https://thinkzone.in/" target="_blank">
              ThinkZone Edubridge
            </Link>{" "}
            {new Date().getFullYear()}
            {"."}
          </Typography>
        </Container>
      </ThemeProvider>

      {/* Loader */}
      <MuiLoader open={loading} />

      {/* Toaster */}
      <ToastContainer />
    </>
  );
}

export default LoginPage;
