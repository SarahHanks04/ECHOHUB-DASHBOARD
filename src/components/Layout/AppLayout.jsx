import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../NavigationBar/Navbar";

const AppLayout = () => {
  return (
    <div className="flex h-screen bg-[#EAEAEA]">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Navbar />
        <div className="flex-1 pt-32 lg:pt-20 p-4 md:p-5 overflow-auto bg-[#EAEAEA]">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AppLayout;
