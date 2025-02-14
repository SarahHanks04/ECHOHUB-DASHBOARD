// import ResponseList from "@/utils/ResponseList";
// import React, { useState } from "react";

// const ToggleComponent = ({ initialTab = "feedback" }) => {
//   const [activeTab, setActiveTab] = useState(initialTab);

//   return (
//     <div className="px-4 sm:px-5 mt-4 sm:ml-0 lg:ml-56">
//       {/* Tab Navigation */}
//       <div className=" whitespace-nowrap scrollbar-hide border-b-2 border-bulb-yellow rounded-lg shadow-md">
//         <div className="flex space-x-5 sm:space-x-12 px-4 sm:px-4">
//           {["feedback", "complaint", "event", "suggestion"].map((tab) => (
//             <button
//               key={tab}
//               onClick={() => setActiveTab(tab)}
//               className={`sm:px-8 py-2 text-sm sm:text-base font-medium rounded-lg transition-all ${
//                 activeTab === tab
//                   ? "text-gray-700 border border-bulb-yellow"
//                   : "text-gray-700 bg-bulb-white"
//               }`}
//             >
//               {tab.charAt(0).toUpperCase() + tab.slice(1)}
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* Tab Content */}
//       <div className="mt-4">
//         {activeTab === "feedback" && (
//           <ResponseList type="feedback" title="Feedback" />
//         )}
//         {activeTab === "complaint" && (
//           <ResponseList type="complaint" title="Complaints" />
//         )}
//         {activeTab === "event" && (
//           <ResponseList type="event" title="Event Form" />
//         )}
//         {activeTab === "suggestion" && (
//           <ResponseList type="suggestion" title="Suggestions" />
//         )}
//       </div>
//     </div>
//   );
// };

// export default ToggleComponent;



// WITH SEARCH FUNCTIONALITY
import ResponseList from "@/utils/ResponseList";
import React, { useState } from "react";
import { useSelector } from "react-redux"; 

const ToggleComponent = ({ initialTab = "feedback" }) => {
  const [activeTab, setActiveTab] = useState(initialTab);
  const searchTerm = useSelector((state) => state.search.term); 

  return (
    <div className="px-4 sm:px-5 mt-4 sm:ml-0 lg:ml-56">
      {/* Tab Navigation */}
      <div className="whitespace-nowrap scrollbar-hide border-b-2 border-bulb-yellow rounded-lg shadow-md">
        <div className="flex space-x-5 sm:space-x-12 px-4 sm:px-4">
          {["feedback", "complaint", "event", "suggestion"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`sm:px-8 py-2 text-sm sm:text-base font-medium rounded-lg transition-all ${
                activeTab === tab
                  ? "text-gray-700 border border-bulb-yellow"
                  : "text-gray-700 bg-bulb-white"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="mt-4">
        {activeTab === "feedback" && (
          <ResponseList type="feedback" title="Feedback" searchTerm={searchTerm} />
        )}
        {activeTab === "complaint" && (
          <ResponseList type="complaint" title="Complaints" searchTerm={searchTerm} />
        )}
        {activeTab === "event" && (
          <ResponseList type="event" title="Event Form" searchTerm={searchTerm} />
        )}
        {activeTab === "suggestion" && (
          <ResponseList type="suggestion" title="Suggestions" searchTerm={searchTerm} />
        )}
      </div>
    </div>
  );
};

export default ToggleComponent;