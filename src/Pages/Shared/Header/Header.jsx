import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../../providers/AuthProvider";
import {
  Briefcase,
  ClipboardList,
  FileCheck2,
  Home,
  LogIn,
  LogOut,
  PlusCircle,
  User,
  UserPlus,
} from "lucide-react";

const Header = () => {
  const { user, userInfo, logOut, loading } = useContext(AuthContext);

  const handleLogout = () => {
    logOut()
      .then(() => {})
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  };

  const navOption = (
    <>
      {/* <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "text-blue-600 font-bold" : ""
          }>
          <Home size={18} className="block md:hidden lg:hidden" />
          Home
        </NavLink>
      </li> */}
      {!user && (
        <>
          <li>
            <NavLink
              to="/signin"
              className={({ isActive }) =>
                isActive ? "text-blue-600 font-bold" : ""
              }>
              <UserPlus size={18} className="block md:hidden lg:hidden" />
              Sign In
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/job-list"
              className={({ isActive }) =>
                isActive ? "text-blue-600 font-bold" : ""
              }>
              <ClipboardList size={18} className="block md:hidden lg:hidden" />
              Job Board
            </NavLink>
          </li>
        </>
      )}

      {user && (
        <li>
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              isActive ? "text-blue-600 font-bold" : ""
            }>
            <User size={18} className="block md:hidden lg:hidden" />
            Profile
          </NavLink>
        </li>
      )}

      {userInfo?.accountType === "tutor" && (
        <>
          <li>
            <NavLink
              to="/job-list"
              className={({ isActive }) =>
                isActive ? "text-blue-600 font-bold" : ""
              }>
              <ClipboardList size={18} className="block md:hidden lg:hidden" />
              Job Board
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/applied-jobs"
              className={({ isActive }) =>
                isActive ? "text-blue-600 font-bold" : ""
              }>
              <FileCheck2 size={18} className="block md:hidden lg:hidden" />
              Applied jobs
            </NavLink>
          </li>
        </>
      )}

      {userInfo?.accountType === "guardian" && (
        <li>
          <NavLink
            to="/post-tuition"
            className={({ isActive }) =>
              isActive ? "text-blue-600 font-bold" : ""
            }>
            <PlusCircle size={18} className="block md:hidden lg:hidden" />
            Post a tuition
          </NavLink>
        </li>
      )}
      {userInfo?.accountType === "admin" && (
        <li>
          <NavLink
            to="/manage-users"
            className={({ isActive }) =>
              isActive ? "text-blue-600 font-bold" : ""
            }>
            <PlusCircle size={18} className="block md:hidden lg:hidden" />
            Manage Users
          </NavLink>
        </li>
      )}
    </>
  );

  // const navOption = (
  //   <>
  //     <li>
  //       <Link to={"/"}>Home</Link>
  //     </li>
  //     {!user && (
  //       <>
  //         <li>
  //           <Link to={"/signup"}>Become a Tutor</Link>
  //         </li>
  //         <li>
  //           <Link to={"/signup"}>Hire a Tutor</Link>
  //         </li>
  //       </>
  //     )}

  //     {user && (
  //       <li>
  //         <Link to={"/profile"}>Profile</Link>
  //       </li>
  //     )}
  //     {userInfo?.accountType === "tutor" && (
  //       <>
  //         <li>
  //           <Link to={"/job-list"}>Job Board</Link>
  //         </li>

  //         <li>
  //           <Link>Applied jobs</Link>
  //         </li>
  //       </>
  //     )}
  //     {userInfo?.accountType === "guardian" && (
  //       <li>
  //         <Link>Post a tuition</Link>
  //       </li>
  //     )}
  //   </>
  // );

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center h-screen w-screen bg-white">
          <progress className="progress w-56"></progress>
        </div>
      ) : (
        <div
          className="bg-[#F2F5FC]"
          style={{ boxShadow: "0 8px 6px -6px #0675c140" }}>
          <div className="mx-auto lg:max-w-[60rem] xl:max-w-[71.25rem] z-50">
            <div className="navbar ">
              <div className="flex-1">
                <Link to={"/"}>
                  <img
                    className="w-36 md:w-[11.1rem]"
                    src="/search-tutor.png"
                    alt=""
                  />
                </Link>
                {/* <a className="btn btn-ghost normal-case text-xl">daisyUI</a> */}
              </div>
              <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 font-medium text-[17px]">
                  {navOption}
                </ul>
              </div>
              <div className="">
                {user ? (
                  <Link
                    onClick={handleLogout}
                    className="btn bg-indigo-500 py-2 px-8 text-white hidden md:block">
                    Logout
                  </Link>
                ) : (
                  <Link
                    to={"/signup"}
                    className="btn bg-indigo-500 py-2 px-8 text-white hidden md:block">
                    Become a Tutor
                  </Link>
                )}
                <div className="drawer lg:hidden">
                  <input
                    id="mobile-drawer"
                    type="checkbox"
                    className="drawer-toggle"
                  />
                  <div className="drawer-content">
                    <label htmlFor="mobile-drawer" className="btn btn-ghost">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M4 6h16M4 12h8m-8 6h16"
                        />
                      </svg>
                    </label>
                  </div>

                  <div className="drawer-side z-40">
                    <label
                      htmlFor="mobile-drawer"
                      className="drawer-overlay"></label>
                    <ul className="menu p-4 w-60 min-h-full bg-base-100 text-base-content">
                      <Link to={"/"}>
                        <img
                          className="w-36 md:w-[11.1rem] pb-2 mb-4 border-b-[1px] border-black"
                          src="/search-tutor.png"
                          alt=""
                        />
                      </Link>
                      {navOption}

                      {user ? (
                        <button
                          onClick={handleLogout}
                          className="flex items-center gap-2 py-2 mt-2 px-4 border border-red-500 text-red-500 rounded-md hover:bg-red-500 hover:text-white transition duration-200">
                          <LogOut size={18} />
                          Logout
                        </button>
                      ) : (
                        <NavLink
                          to="/signin"
                          className={({ isActive }) =>
                            `flex items-center gap-2 py-2 mt-2 px-4 rounded-md transition duration-200 ${
                              isActive
                                ? "bg-blue-600 text-white font-semibold"
                                : "border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
                            }`
                          }>
                          <LogIn size={18} />
                          Sign In
                        </NavLink>
                      )}
                    </ul>
                  </div>
                </div>

                {/* <div className="dropdown">
                  <label tabIndex={0} className="btn btn-ghost lg:hidden">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 6h16M4 12h8m-8 6h16"
                      />
                    </svg>
                  </label>
                  <ul
                    tabIndex={0}
                    className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 right-0">
                    {navOption}
                  </ul>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
