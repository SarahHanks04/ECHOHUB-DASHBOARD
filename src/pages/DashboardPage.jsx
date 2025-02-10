import { AuthContext } from "@/context/AuthenticationContext";
import BarChart from "@/utils/Dashboard/BarChart";
import RecentEntry from "@/utils/Dashboard/RecentEntry";
import RecentCommentList from "@/utils/Dashboard/RecentList/RecentCommentList";
import React, { useContext } from "react";

const DashboardPage = () => {
  const { userName } = useContext(AuthContext);

  return (
    <div className="bg-[#EAEAEA] lg:pl-10 lg:ml-[12rem] sm:ml-0">
      <header className="text-2xl font-bold pt-8 sm:pt-12 mb-2">
        {`Welcome ${userName || "User"},`}
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
        {/* Left Section */}
        <div className="lg:col-span-2 ">
          <RecentEntry />

          <h1 className="py-4 text-2xl font-medium">Response Chart</h1>
          <div className="mt-5">
            <BarChart />
          </div>
        </div>

        {/* Right Section */}
        <div className="lg:col-span-1 mt-4 w-full">
          <RecentCommentList />
        </div>
      </div>

      {/* Soon to be component */}
      {/* <div className="mt-6"></div> */}
    </div>
  );
};

export default DashboardPage;
