import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// components
import HomePage from "../pages/home/Home.Page";
import LoginPage from "../pages/login/Login.Page";
import ListTemplatesPage from "../pages/templates/ListTemplates.Page";
import MediaGalleryPage from "../pages/media_gallery/MediaGallery.Page";

function AppRoute({ loggedin }) {
  return (
    <Routes>
      {!loggedin && (
        <>
          <Route path="/login" element={<LoginPage />} />
        </>
      )}
      {loggedin && (
        <>
          <Route exact path="/" element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/templates" element={<ListTemplatesPage />} />
          <Route path="/mediagallery" element={<MediaGalleryPage />} />
        </>
      )}
      <Route path="*" element={<Navigate to={loggedin ? "/home" : "/login"} />} />
    </Routes>
  );
}
export const menus = [
  { text: "Home", navigateTo: "/home" },
  { text: "Templates", navigateTo: "/templates" },
  { text: "Gallery", navigateTo: "/mediagallery" },
];

export default AppRoute;
