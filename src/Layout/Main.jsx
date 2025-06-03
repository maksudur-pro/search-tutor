import React from "react";
import { Outlet } from "react-router-dom";
import TopBanner from "../Pages/Shared/TopBanner/TopBanner";
import Header from "../Pages/Shared/Header/Header";
import Footer from "../Pages/Shared/Footer/Footer";

const Main = () => {
  return (
    <div>
      <TopBanner></TopBanner>
      <Header></Header>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  );
};

export default Main;
