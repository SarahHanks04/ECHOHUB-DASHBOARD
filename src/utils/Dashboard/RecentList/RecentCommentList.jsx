// import { useFetchResponses } from "@/api/ResponseApi";
// import React, { useState } from "react";
// import RecentComment from "./RecentComment";
// import Spinner from "@/utils/Spinner/Spinner";

// const RecentCommentList = () => {
//   const { data: responses, isLoading, isError } = useFetchResponses();
//   const [showAll, setShowAll] = useState(false);

//   if (isLoading)
//     return (
//       <div className="text-center py-4">
//         <Spinner />
//       </div>
//     );
//   if (isError)
//     return (
//       <div className="text-center py-4 text-red-500">
//         Error fetching responses
//       </div>
//     );

//   // Sorting responses from latest to oldest
//   const sortedResponses = responses.sort(
//     (a, b) => new Date(b.submissionDate) - new Date(a.submissionDate)
//   );

//   // Determine which responses to display based on showAll state
//   const displayedResponses = showAll
//     ? sortedResponses
//     : sortedResponses.slice(0, 5);

//   return (
//     <div className="w-full bg-bulb-white rounded-[8px] p-3">
//       <h2 className="text-xl font-bold pt-4 mb-4">Recent Comments</h2>
//       {displayedResponses.map((response) => (
//         <RecentComment key={response.id} response={response} />
//       ))}
//       {showAll ? (
//         <div
//           className="text-center w-full bg-bulb-yellow py-[10px] rounded-[8px] text-bulb-blue mt-8 cursor-pointer"
//           onClick={() => setShowAll(false)}
//         >
//           Show Less
//         </div>
//       ) : (
//         <div
//           className="text-center w-full bg-bulb-yellow py-[10px] rounded-[8px] text-bulb-blue mt-8 cursor-pointer"
//           onClick={() => setShowAll(true)}
//         >
//           View All
//         </div>
//       )}
//     </div>
//   );
// };

// export default RecentCommentList;

// WITH SEARCH FUNCTIONALITY
import { useFetchResponses } from "@/api/ResponseApi";
import React, { useState } from "react";
import RecentComment from "./RecentComment";
import Spinner from "@/utils/Spinner/Spinner";
import { useSelector } from "react-redux";

const RecentCommentList = () => {
  const { data: responses, isLoading, isError } = useFetchResponses();
  const [showAll, setShowAll] = useState(false);
  const searchTerm = useSelector((state) => state.search.term);

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

  // Filter responses based on search term (including date and months)
  const filteredResponses = responses.filter((response) => {
    if (!searchTerm) return true;

    // Check if any field in the response matches the search term
    const fieldMatch = response.data.some((field) =>
      String(field.value || "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );

    // Check if the submission date matches the search term
    const submissionDate = new Date(response.submissionDate);
    const dateMatch = submissionDate
      .toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    // Check if the month matches the search term
    const monthMatch = submissionDate
      .toLocaleString("default", { month: "long" })
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    return fieldMatch || dateMatch || monthMatch;
  });

  // Sorting responses from latest to oldest
  const sortedResponses = filteredResponses.sort(
    (a, b) => new Date(b.submissionDate) - new Date(a.submissionDate)
  );

  // Determine which responses to display based on showAll state
  const displayedResponses = showAll
    ? sortedResponses
    : sortedResponses.slice(0, 5);

  return (
    <div className="w-full bg-bulb-white rounded-[8px] p-3">
      <h2 className="text-xl font-bold pt-4 mb-4">Recent Comments</h2>
      {displayedResponses.length > 0 ? (
        displayedResponses.map((response) => (
          <RecentComment key={response.id} response={response} />
        ))
      ) : (
        <p className="text-gray-600 text-center">
          No matching results found for "{searchTerm}".
        </p>
      )}
      {sortedResponses.length > 5 && (
        <div
          className="text-center w-full bg-bulb-yellow py-[10px] rounded-[8px] text-bulb-blue mt-8 cursor-pointer"
          onClick={() => setShowAll(!showAll)}
        >
          {showAll ? "Show Less" : "View All"}
        </div>
      )}
    </div>
  );
};

export default RecentCommentList;
