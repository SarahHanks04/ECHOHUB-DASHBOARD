import React from "react";
import { useLocation } from "react-router-dom";
import SearchBar from "./SearchBar";
import Notification from "./Notification";
import ProfileSection from "./ProfileSection";

const Navbar = () => {
  const location = useLocation();

  const routeTitles = {
    "/dashboard": "Overview",
    "/complaints": "Complaints",
    "/feedback": "Feedback",
    "/settings": "Settings",
    "/profile": "Profile Info",
  };

  const currentTitle = routeTitles[location.pathname] || "Overview";

  return (
    <nav className="fixed top-0 left-0 lg:left-56 w-full lg:w-[calc(100%-14rem)] bg-[#F8F5F5] h-16 lg:h-20 flex items-center justify-between px-4 md:px-6 lg:px- shadow-xl z-40">
      {/* Title Section */}
      <div className="flex items-center pl-14 lg:pl-0">
        <h2 className="text-lg md:text-xl lg:text-[34px] font-semibold text-[#171717] leading-[1.2]">
          {currentTitle}
        </h2>
      </div>

      {/* Right Section: Search, Notification, and Profile */}
      <div className="flex items-center space-x-4 md:space-x-6">
        {/* SearchBar: Hidden on small screens */}
        <div className="hidden md:block">
          <SearchBar />
        </div>

        {/* Notification: Shown on medium screens */}
        <div className="hidden md:block">
          <Notification />
        </div>

        {/* Profile Section: Always visible */}
        <ProfileSection />
      </div>
    </nav>
  );
};

export default Navbar;
