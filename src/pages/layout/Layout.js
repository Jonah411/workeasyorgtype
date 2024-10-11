import React from "react";
import SideBar from "./SideBar";
import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

const Layout = ({ showSidebar, toggleSidebar }) => {
  return (
    <div className="app">
      <SideBar showSidebar={showSidebar} toggleSidebar={toggleSidebar} />
      <Header toggleSidebar={toggleSidebar} />
      <div className={`content ${showSidebar ? "content-with-sidebar" : ""}`}>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
