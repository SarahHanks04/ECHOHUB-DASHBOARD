import ResponseList from "@/utils/ResponseList";
import React, { useState } from "react";

const ToggleComponent = ({ initialTab = "feedback" }) => {
  const [activeTab, setActiveTab] = useState(initialTab);

  return (
    <div className="px-5 mt-4 sm:ml-0 lg:ml-56">
      {/* Tab Navigation */}
      <div className="flex justify-start space-x-12 border-b-2 border-bulb-yellow px-10 rounded-lg shadow-md">
        {["feedback", "complaint", "event", "suggestion"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 font-medium rounded-lg transition-all ${
              activeTab === tab
                ? "text-gray-700 border border-bulb-yellow"
                : "text-gray-700 bg-bulb-white"
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="rounded-lg shadow-md">
        {activeTab === "feedback" && (
          <ResponseList type="feedback" title="Feedback" />
        )}
        {activeTab === "complaint" && (
          <ResponseList type="complaint" title="Complaints" />
        )}
        {activeTab === "event" && (
          <ResponseList type="event" title="Event Form" />
        )}
        {activeTab === "suggestion" && (
          <ResponseList type="suggestion" title="Suggestions" />
        )}
      </div>
    </div>
  );
};

export default ToggleComponent;
