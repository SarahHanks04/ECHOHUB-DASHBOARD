import React from "react";
import { useFetchResponsesByType } from "@/api/ResponseApi";
import FeedbackColored from "../../assets/Icons/FeedbackColored.svg";
import { useNavigate } from "react-router-dom";

const NewAlert = () => {
  const {
    data: feedbackResponses,
    isLoading,
    isError,
  } = useFetchResponsesByType("feedback");

  const navigate = useNavigate();

  // Calculate the number of new feedback requests
  const newFeedbackCount = feedbackResponses?.filter(
    (response) => response.status === "unresolved"
  ).length;

  if (isError || !newFeedbackCount) return null;

  return (
    <div className="bg-bulb-white rounded-lg shadow-md p-6 w-full max-w-md mx-auto">
      {/* Title */}
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        New Feedback Alert
      </h2>

      {/* Icon and Message */}
      <div className="flex items-center space-x-4">
        <div className="p-3 bg-blue-50 rounded-full">
          <img src={FeedbackColored} alt="Feedback Icon" size={24} />
        </div>
        <p className="text-gray-600 text-[14px]">
          You have{" "}
          <span className="font-semibold text-red-500">
            {newFeedbackCount}
          </span>{" "}
          new feedback requests to action.
        </p>
      </div>

      {/* View Button */}
      <div className="mt-6">
        <button
          onClick={() => navigate("/feedbacks")}
          className="w-full bg-bulb-yellow text-bulb-blue py-2 px-4 rounded-md transition-colors"
        >
          View
        </button>
      </div>
    </div>
  );
};

export default NewAlert;
