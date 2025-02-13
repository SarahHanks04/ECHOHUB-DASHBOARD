import React from "react";
import RecentCard from "./RecentCard";
import { useFetchResponsesByType } from "@/api/ResponseApi";
import { useNavigate } from "react-router-dom";

const RecentEntry = () => {
  const navigate = useNavigate();
  const { data: feedback } = useFetchResponsesByType("feedback");
  const { data: complaint } = useFetchResponsesByType("complaint");
  // const { data: event } = useFetchResponsesByType("event");

  const handleCardClick = (type) => {
    navigate(`/${type}`, { replace: true });
  };

  return (
    <div className="flex justify-around gap-6 py-4">
      <RecentCard
        title="Recent Feedback"
        subTitle="Feedbacks"
        count={feedback?.length || 0}
        onClick={() => handleCardClick("feedbacks")}
      />
      <RecentCard
        title="Recent Complaints"
        subTitle="Complaints"
        count={complaint?.length || 0}
        onClick={() => handleCardClick("complaints")}
      />
      {/* <RecentCard
        title="Recent Events"
        subTitle="Events"
        count={event?.length || 0}
        onClick={() => handleCardClick("feedbacks")}
      /> */}
    </div>
  );
};

export default RecentEntry;
