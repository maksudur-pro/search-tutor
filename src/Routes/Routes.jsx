import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home";
import JobBoard from "../Pages/JobBoard/JobBoard";
import SignIn from "../Pages/SignIn/SignIn";
import Signup from "../Pages/Signup/Signup";
import Profile from "../Pages/Profile/Profile";
import PublicRoute from "./PublicRoute/PublicRoute";
import PrivateRoute from "./PrivateRoute/PrivateRoute";
import RoleRoute from "./RoleRoute/RoleRoute";
import ManageUsers from "../Pages/Admin/ManageUsers/ManageUsers";
import HireTutor from "../Pages/HireTutor/HireTutor";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/hire-tutor",
        element: <HireTutor />,
      },
      {
        path: "/job-list",
        element: (
          <RoleRoute allowedRoles={["tutor"]}>
            <JobBoard />
          </RoleRoute>
        ),
      },
      {
        path: "/manage-users",
        element: (
          <RoleRoute allowedRoles={["admin"]}>
            <ManageUsers />
          </RoleRoute>
        ),
      },
      {
        path: "/signin",
        element: (
          <PublicRoute>
            <SignIn />
          </PublicRoute>
        ),
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/profile",
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
    ],
  },
]);
