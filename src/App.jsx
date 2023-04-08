import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import AdminLayout from "layouts/admin";
import UserLayout from 'layouts/user';
import LoginPage from "layouts/login";
const App = () => {
  return (
    <Routes>
      <Route path="admin/:token" element={<AdminLayout />} />
      <Route path="login" element={<LoginPage />} />
      <Route path="user" element={<UserLayout />} />
      <Route path="/" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default App;
