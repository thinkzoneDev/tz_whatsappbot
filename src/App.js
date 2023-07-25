import React, { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import AppRoute from "./route/AppRoute";
import { check_login_status } from "./pages/login/Login.Slice";

import LayoutNoauth from "./layouts/LayoutNoauth";
import LayoutAuth from "./layouts/LayoutAuth";
// import dotenv from "dotenv";
// dotenv.config();
function App() {
  const dispatch = useDispatch();
  const loggedin = useSelector((state) => state.LoginSlice.loggedin);

  useEffect(() => {
    dispatch(check_login_status());
  }, [dispatch]);

  return (
    <>
      <Router>
        {loggedin ? (
          <div>
            <LayoutAuth />
            <br />
          </div>
        ) : (
          <div>{/* <LayoutNoauth /> */}</div>
        )}
        <div className="page_container">
          <AppRoute loggedin={loggedin} />
        </div>
      </Router>
    </>
  );
}

export default App;
