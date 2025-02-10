import { useFetchResponses } from "@/api/ResponseApi";
import React, { useState } from "react";
import RecentComment from "./RecentComment";
import Spinner from "@/utils/Spinner/Spinner";

const RecentCommentList = () => {
  const { data: responses, isLoading, isError } = useFetchResponses();
  const [showAll, setShowAll] = useState(false);

  if (isLoading)
    return (
      <div className="text-center py-4">
        <Spinner />
      </div>
    );
  if (isError)
    return (
      <div className="text-center py-4 text-red-500">
        Error fetching responses
      </div>
    );

  // Sorting responses from latest to oldest
  const sortedResponses = responses.sort(
    (a, b) => new Date(b.submissionDate) - new Date(a.submissionDate)
  );

  // Determine which responses to display based on showAll state
  const displayedResponses = showAll
    ? sortedResponses
    : sortedResponses.slice(0, 5);

  return (
    <div className="w-full bg-bulb-white rounded-[8px] p-4">
      <h2 className="text-xl font-bold mb-4">Recent Comments</h2>
      {displayedResponses.map((response) => (
        <RecentComment key={response.id} response={response} />
      ))}
      {showAll ? (
        <div
          className="text-center w-full bg-bulb-yellow py-[10px] rounded-[8px] text-bulb-blue mt-8 cursor-pointer"
          onClick={() => setShowAll(false)}
        >
          Show Less
        </div>
      ) : (
        <div
          className="text-center w-full bg-bulb-yellow py-[10px] rounded-[8px] text-bulb-blue mt-8 cursor-pointer"
          onClick={() => setShowAll(true)}
        >
          View All
        </div>
      )}
    </div>
  );
};

export default RecentCommentList;
