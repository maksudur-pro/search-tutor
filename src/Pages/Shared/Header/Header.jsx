import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const navOption = (
    <>
      <li>
        <Link to={"/"}>Home</Link>
      </li>

      <li>
        <Link to={"/job-list"}>Job Board</Link>
      </li>
    </>
  );

  return (
    <div
      className="bg-[#F2F5FC]"
      style={{ boxShadow: "0 8px 6px -6px #0675c140" }}>
      <div className="mx-auto lg:max-w-[60rem] xl:max-w-[71.25rem]">
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
            <Link
              to={"/signin"}
              className="btn px-8 py-2 bg-indigo-500 text-white">
              Sign In
            </Link>
            <div className="dropdown">
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
