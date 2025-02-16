// import React from "react";
// import RecentCard from "./RecentCard";
// import { useFetchResponsesByType } from "@/api/ResponseApi";
// import { useNavigate } from "react-router-dom";

// const RecentEntry = () => {
//   const navigate = useNavigate();
//   const { data: feedback } = useFetchResponsesByType("feedback");
//   const { data: complaint } = useFetchResponsesByType("complaint");

//   const handleCardClick = (type) => {
//     navigate(`/${type}`, { replace: true });
//   };

//   return (
//     <div className="flex justify-around gap-6 py-4">
//       <RecentCard
//         title="Recent Feedback"
//         subTitle="Feedbacks"
//         count={feedback?.length || 0}
//         onClick={() => handleCardClick("feedbacks")}
//       />
//       <RecentCard
//         title="Recent Complaints"
//         subTitle="Complaints"
//         count={complaint?.length || 0}
//         onClick={() => handleCardClick("complaints")}
//       />
//     </div>
//   );
// };

// export default RecentEntry;

import React from "react";
import RecentCard from "./RecentCard";
import { useFetchResponsesByType } from "@/api/ResponseApi";
import { useNavigate } from "react-router-dom";

const RecentEntry = () => {
  const navigate = useNavigate();

  // Fetch feedback and complaint data separately
  const { data: feedback } = useFetchResponsesByType("feedback");
  const { data: complaint } = useFetchResponsesByType("complaint");

  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split("T")[0];

  // Filter feedback and complaint data for today
  const todaysFeedback = feedback?.filter(
    (response) =>
      new Date(response.submissionDate).toISOString().split("T")[0] === today
  );

  const todaysComplaints = complaint?.filter(
    (response) =>
      new Date(response.submissionDate).toISOString().split("T")[0] === today
  );

  const handleCardClick = (type) => {
    navigate(`/${type}`, { replace: true });
  };

  return (
    <div className="flex justify-around gap-6 py-4">
      <RecentCard
        title="Recent Feedback"
        subTitle="Feedbacks"
        count={todaysFeedback?.length || 0}
        onClick={() => handleCardClick("feedbacks")}
      />
      <RecentCard
        title="Recent Complaints"
        subTitle="Complaints"
        count={todaysComplaints?.length || 0}
        onClick={() => handleCardClick("complaints")}
      />
    </div>
  );
};

export default RecentEntry;
