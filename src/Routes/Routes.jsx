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
import TuitionRequests from "../Pages/Admin/TuitionRequests/TuitionRequests";
import PostJob from "../Pages/Admin/PostJob/PostJob";
import AppliedJobs from "../Pages/AppliedJobs/AppliedJobs";
import AdminApplications from "../Pages/Admin/AdminApplications/AdminApplications";
import TutorDetailsPage from "../Pages/Admin/TutorDetailsPage/TutorDetailsPage";
import Tutors from "../Pages/Admin/Tutors/Tutors";

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
        element: <JobBoard />,
      },
      {
        path: "/applied-jobs",
        element: (
          <RoleRoute allowedRoles={["tutor"]}>
            <AppliedJobs />
          </RoleRoute>
        ),
      },
      {
        path: "/admin/applications",
        element: (
          <RoleRoute allowedRoles={["admin"]}>
            <AdminApplications />
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
        path: "/tuition-requests",
        element: (
          <RoleRoute allowedRoles={["admin"]}>
            <TuitionRequests />
          </RoleRoute>
        ),
      },
      {
        path: "/tutors",
        element: (
          <RoleRoute allowedRoles={["admin"]}>
            <Tutors />
          </RoleRoute>
        ),
      },
      {
        path: "/tutor/:uid",
        element: (
          <RoleRoute allowedRoles={["admin"]}>
            <TutorDetailsPage />
          </RoleRoute>
        ),
      },
      {
        path: "/post-job",
        element: (
          <RoleRoute allowedRoles={["admin"]}>
            <PostJob />
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
