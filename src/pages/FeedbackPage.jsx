import FeedbackMetrics from "@/utils/Feedback/FeedbackMetrics";
import FeedbackTable from "@/utils/Feedback/FeedbackTable";
import React from "react";

const FeedbackPage = () => {
  return (
    <div>
      <FeedbackMetrics />
      <FeedbackTable />
    </div>
  );
};

export default FeedbackPage;
