import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import AuthPage from "./pages/AuthPage";
import { useAuthentication } from "./auth";
import RedirectGoogleAuth from "./components/GoogleRedirectHandler";

import FishList from "./components/FishList";
import FishForm from "./components/FishForm";
import FishPhotoList from "./components/FishPhotoList";
import LocalNameList from "./components/LocalNameList";
import LocalNameForm from "./components/LocalNameForm";

import FishRoutes from "./routes/FishRoutes";

function App() {
  const { isAuthorized } = useAuthentication();
  const ProtectedLogin = () => {
    return isAuthorized ? (
      <Navigate to="/" />
    ) : (
      <AuthPage initialMethod="login" />
    );
  };

  const ProtectedRegister = () => {
    return isAuthorized ? (
      <Navigate to="/" />
    ) : (
      <AuthPage initialMethod="register" />
    );
  };

  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/login/callback" element={<RedirectGoogleAuth />} />
          <Route path="/login" element={<ProtectedLogin />} />
          <Route path="/register" element={<ProtectedRegister />} />
          <Route path="/" element={<Home />} />

          <Route path="/" element={<FishRoutes />}>
            <Route path="fish" element={<FishList />} />
            <Route path="add-fish" element={<FishForm />} />
            <Route path="edit-fish/:id" element={<FishForm />} />
            <Route path="local-names" element={<LocalNameList />} />
            <Route path="add-local-name" element={<LocalNameForm />} />
            <Route path="edit-local-name/:id" element={<LocalNameForm />} />
            <Route path="photos" element={<FishPhotoList />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
