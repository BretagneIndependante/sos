import React from "react";

// Admin Imports
import MainDashboard from "views/admin/default";

// Icon Imports
import { MdHome } from "react-icons/md";

const routes = [
  {
    name: "Accueil",
    layout: "/admin",
    path: "",
    icon: <MdHome className="h-6 w-6" />,
    component: <MainDashboard />,
  },
];
export default routes;
