import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import AdminLayout from "layouts/admin";
import UserLayout from 'layouts/user';
const App = () => {
  return (
    <Routes>
      <Route path="admin/:token" element={<AdminLayout />} />
      <Route path="user/*" element={<UserLayout />} />
      <Route path="/" element={<Navigate to="/admin" replace />} />
    </Routes>
  );
};

export default App;
