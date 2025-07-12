import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import TopBanner from "../Pages/Shared/TopBanner/TopBanner";
import Header from "../Pages/Shared/Header/Header";
import Footer from "../Pages/Shared/Footer/Footer";
import { AuthContext } from "../providers/AuthProvider";

const Main = () => {
  const { loading } = useContext(AuthContext);
  return (
    <>
      {loading ? (
        <div className="flex items-center justify-center h-screen">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : (
        <div className="flex flex-col min-h-screen">
          <TopBanner />
          <Header />
          {/* This main wrapper will take all available vertical space */}
          <main className="flex-grow">
            <Outlet />
          </main>
          <Footer />
        </div>
      )}
    </>
  );
};

export default Main;
