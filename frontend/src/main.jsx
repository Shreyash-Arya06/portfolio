import React, {StrictMode} from "react";
import {createRoot} from "react-dom/client";
import {RouterProvider, createBrowserRouter, Navigate} from "react-router-dom";

import App from "./App.jsx";
import MainLayout from "./layouts/mainLayout/MainLayout.jsx";
import Home from "./pages/home/Home.jsx";
import Projects from "./pages/projects/Projects.jsx";
import Beyond from "./pages/beyond/Beyond.jsx";
import ConnectMe from "./pages/connectMe/ConnectMe.jsx";
import NotFound from "./pages/notFound/NotFound.jsx";
import Resume from "./pages/resume/Resume.jsx";


import AdminLayout from "./layouts/adminLayout/AdminLayout.jsx";
import UpdateAbout from "./pages/admin/updateAbout/UpdateAbout.jsx";
import EditSkills from "./pages/admin/editSkills/EditSkills.jsx";
import EditTimeline from "./pages/admin/editTimeline/EditTimeline.jsx";
import AddProject from "./pages/admin/addProject/AddProject.jsx";
import EditProject from "./pages/admin/editProject/EditProject.jsx";
import ManageLibrary from "./pages/admin/manageLibrary/ManageLibrary.jsx";
import AdminLogin from "./pages/admin/adminLogin/AdminLogin.jsx";
import UpdateResume from "./pages/admin/updateResume/UpdateResume.jsx";

import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    errorElement: <NotFound/>
  },
  {
    element: <MainLayout/>,
    children: [
      {path: "/home", element: <Home/>},
      {path: "/projects", element: <Projects/>},
      {path: "/beyond", element: <Beyond/>},
      {path: "/resume", element: <Resume/>},
      {path: "/connect-me", element: <ConnectMe/>},
    ],
  },
  {
    element: <AdminLayout/>,
    path: "admin-actions",
    children: [
      {index: true, element: <Navigate to="admin-login" replace/>},
      {path: "update-about", element: <UpdateAbout/>},
      {path: "edit-skills", element: <EditSkills/>},
      {path: "edit-timeline", element: <EditTimeline/>},
      {path: "add-project", element: <AddProject/>},
      {path: "edit-project", element: <EditProject/>},
      {path: "manage-library", element: <ManageLibrary/>},
      {path: "admin-login", element: <AdminLogin/>},
      {path: "update-resume", element: <UpdateResume/>},
    ]
  }
]);
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
