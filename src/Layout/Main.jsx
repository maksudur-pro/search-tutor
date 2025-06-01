import React from "react";
import { Outlet } from "react-router-dom";
import TopBanner from "../Pages/Shared/TopBanner/TopBanner";
import Header from "../Pages/Shared/Header/Header";

const Main = () => {
  return (
    <div>
      <TopBanner></TopBanner>
      <Header></Header>
      <Outlet></Outlet>
    </div>
  );
};

export default Main;
