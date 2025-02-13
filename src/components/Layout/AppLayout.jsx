import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../NavigationBar/Navbar";

const AppLayout = () => {
  return (
    <div className="flex bg-[#F7F8FB]">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Navbar />
        <div className="flex-1 pt-10 overflow-auto lg:pt-20 p-4 md:p-5 bg-[#F7F8FB]">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AppLayout;
