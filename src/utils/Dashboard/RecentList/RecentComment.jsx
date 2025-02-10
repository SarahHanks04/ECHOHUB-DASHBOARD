// import { X } from "lucide-react";
// import React, { useState, useEffect } from "react";
// import Message from "../../../assets/Icons/Message.svg";
// import Expand from "../../../assets/Icons/Expand.svg";
// import WishIcon from "../../../assets/Icons/WishIcon.svg";

// const RecentComment = ({ response }) => {
//   // Message functionality
//   const [messageOpen, setMessageOpen] = useState(false);
//   const [messageText, setMessageText] = useState("");
//   const [savedMessages, setSavedMessages] = useState([]);

//   // Like functionality
//   const [isLiked, setIsLiked] = useState(false);

//   // Load saved messages and like status from localStorage
//   useEffect(() => {
//     const storedMessages = localStorage.getItem(`messages_${response.id}`);
//     if (storedMessages) {
//       setSavedMessages(JSON.parse(storedMessages));
//     }
//     const likedStatus = localStorage.getItem(`isLiked_${response.id}`);
//     if (likedStatus) {
//       setIsLiked(JSON.parse(likedStatus));
//     }
//   }, [response.id]);

//   // Save message to localStorage
//   const handleSaveMessage = () => {
//     if (messageText.trim()) {
//       const newMessageList = [...savedMessages, messageText];
//       setSavedMessages(newMessageList);
//       localStorage.setItem(
//         `messages_${response.id}`,
//         JSON.stringify(newMessageList)
//       );
//       setMessageText("");
//       setMessageOpen(false);
//     }
//   };

//   // Delete message from localStorage
//   const handleDeleteMessage = (index) => {
//     const newMessageList = savedMessages.filter((_, i) => i !== index);
//     setSavedMessages(newMessageList);
//     localStorage.setItem(
//       `messages_${response.id}`,
//       JSON.stringify(newMessageList)
//     );
//   };

//   // Like functionality
//   const handleLike = () => {
//     const newLikeStatus = !isLiked;
//     setIsLiked(newLikeStatus);
//     localStorage.setItem(
//       `isLiked_${response.id}`,
//       JSON.stringify(newLikeStatus)
//     );
//   };

//   // Download functionality
//   const handleDownload = () => {
//     const dataStr =
//       "data:text/json;charset=utf-8," +
//       encodeURIComponent(JSON.stringify(response));
//     const downloadAnchorNode = document.createElement("a");
//     downloadAnchorNode.setAttribute("href", dataStr);
//     downloadAnchorNode.setAttribute("download", `response_${response.id}.json`);
//     document.body.appendChild(downloadAnchorNode); // required for firefox
//     downloadAnchorNode.click();
//     downloadAnchorNode.remove();
//   };

//   // Check if response.data exists before calling find
//   if (!response.data) {
//     console.error("No data found for response with id:", response.id);
//     return null;
//   }

//   // Extract name information
//   let nameData = response.data.find((item) => item.label === "Name");
//   let firstNameData = response.data.find(
//     (item) =>
//       item.label.toLowerCase() === "firstname" ||
//       item.label.toLowerCase() === "first name"
//   );
//   let lastNameData = response.data.find(
//     (item) =>
//       item.label.toLowerCase() === "lastname" ||
//       item.label.toLowerCase() === "last name"
//   );

//   let initials;
//   let fullName;

//   if (nameData) {
//     fullName = nameData.value;
//     const nameParts = nameData.value.split(" ");
//     if (nameParts.length > 1) {
//       initials = `${nameParts[0][0]?.toUpperCase() || ""}${
//         nameParts[nameParts.length - 1][0]?.toUpperCase() || ""
//       }`;
//     } else {
//       initials = nameData.value.slice(0, 2)?.toUpperCase() || "AN";
//     }
//   } else if (firstNameData && lastNameData) {
//     fullName = `${firstNameData.value || ""} ${
//       lastNameData.value || ""
//     }`.trim();
//     initials = `${firstNameData.value?.charAt(0)?.toUpperCase() || ""}${
//       lastNameData.value?.charAt(0)?.toUpperCase() || ""
//     }`;
//     if (initials.length === 0) initials = "AN";
//   } else if (firstNameData) {
//     fullName = firstNameData.value || "Anonymous";
//     initials = (firstNameData.value || "Anonymous").slice(0, 2).toUpperCase();
//   } else if (lastNameData) {
//     fullName = lastNameData.value || "Anonymous";
//     initials = (lastNameData.value || "Anonymous").slice(0, 2).toUpperCase();
//   } else {
//     fullName = "Anonymous";
//     initials = "AN";
//   }

//   // Find location or type of response
//   const locationOrType = response.formType || "Unknown";

//   // Find the message or feedback from the response with type textarea
//   const messageData = response.data.find((item) => item.type === "textarea");

//   // Calculate time difference in human-readable format
//   const submissionDate = new Date(response.submissionDate);
//   const now = new Date();
//   const diffInMs = now - submissionDate;
//   const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
//   const diffInDays = Math.floor(diffInHours / 24);

//   let timeAgo;
//   if (diffInDays > 0) {
//     timeAgo = `${diffInDays} days ago`;
//   } else {
//     timeAgo = `${diffInHours} hr${diffInHours !== 1 ? "s" : ""} ago`;
//   }

//   return (
//     <section className="border-b border-b-gray-400">
//       <div className="p-4">
//         <div className="flex items-center">
//           <div className="w-14 h-14 bg-bulb-blue text-bulb-yellow flex items-center justify-center rounded-full text-2xl font-bold mr-4">
//             {initials}
//           </div>
//           <div className="flex-grow">
//             <div className="font-semibold flex justify-between">
//               <h2>{fullName === "" ? "Anonymous" : fullName}</h2>
//               <span className="text-sm text-gray-500">{timeAgo}</span>
//             </div>
//             <div className="text-sm text-gray-500">
//               on {locationOrType} - #{response.id}
//             </div>
//           </div>
//           <div className="flex space-x-2">
//             <button
//               onClick={() => setMessageOpen(!messageOpen)}
//               className="text-gray-500"
//             >
//               <img src={Message} alt="Message Icon" />
//             </button>
//             <button
//               onClick={handleLike}
//               className={`text-${isLiked ? "red" : "gray"}-500`}
//             >
//               <img src={WishIcon} alt="Like icon" />
//             </button>
//             <button onClick={handleDownload} className="text-gray-500">
//               <img src={Expand} alt="Download Icon" />
//             </button>
//           </div>
//         </div>
//         {messageOpen && (
//           <div className="mt-2">
//             <textarea
//               value={messageText}
//               onChange={(e) => setMessageText(e.target.value)}
//               className="w-full p-2 border"
//               placeholder="Write a message..."
//             />
//             <div className="flex justify-between mt-2">
//               <button
//                 onClick={handleSaveMessage}
//                 className="bg-bulb-yellow text-bulb-blue px-2 py-1 rounded"
//               >
//                 Save
//               </button>
//               <button
//                 onClick={() => setMessageOpen(false)}
//                 className="bg-bulb-blue text-bulb-yellow px-2 py-1 rounded"
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         )}
//         {savedMessages.map((msg, index) => (
//           <div key={index} className="mt-2 flex justify-between items-center">
//             <p>{msg}</p>
//             <button
//               onClick={() => handleDeleteMessage(index)}
//               className="text-red-500"
//             >
//               <X />
//             </button>
//           </div>
//         ))}
//         <div className="p-2">
//           <p className="pl-12">
//             {messageData ? messageData.value : "No message"}
//           </p>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default RecentComment;

import { X } from "lucide-react";
import React, { useState, useEffect } from "react";
import Message from "../../../assets/Icons/Message.svg";
import Expand from "../../../assets/Icons/Expand.svg";
import WishIcon from "../../../assets/Icons/WishIcon.svg";

const RecentComment = ({ response }) => {
  // Message functionality
  const [messageOpen, setMessageOpen] = useState(false);
  const [messageText, setMessageText] = useState("");
  const [savedMessages, setSavedMessages] = useState([]);

  // Like functionality
  const [isLiked, setIsLiked] = useState(false);

  // Load saved messages and like status from localStorage
  useEffect(() => {
    const storedMessages = localStorage.getItem(`messages_${response.id}`);
    if (storedMessages) {
      setSavedMessages(JSON.parse(storedMessages));
    }
    const likedStatus = localStorage.getItem(`isLiked_${response.id}`);
    if (likedStatus) {
      setIsLiked(JSON.parse(likedStatus));
    }
  }, [response.id]);

  // Save message to localStorage
  const handleSaveMessage = () => {
    if (messageText.trim()) {
      const newMessageList = [...savedMessages, messageText];
      setSavedMessages(newMessageList);
      localStorage.setItem(
        `messages_${response.id}`,
        JSON.stringify(newMessageList)
      );
      setMessageText("");
      setMessageOpen(false);
    }
  };

  // Delete message from localStorage
  const handleDeleteMessage = (index) => {
    const newMessageList = savedMessages.filter((_, i) => i !== index);
    setSavedMessages(newMessageList);
    localStorage.setItem(
      `messages_${response.id}`,
      JSON.stringify(newMessageList)
    );
  };

  // Like functionality
  const handleLike = () => {
    const newLikeStatus = !isLiked;
    setIsLiked(newLikeStatus);
    localStorage.setItem(
      `isLiked_${response.id}`,
      JSON.stringify(newLikeStatus)
    );
  };

  // Download functionality
  const handleDownload = () => {
    const dataStr =
      "data:text/json;charset=utf-8," +
      encodeURIComponent(JSON.stringify(response));
    const downloadAnchorNode = document.createElement("a");
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", `response_${response.id}.json`);
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  // Check if response.data exists before calling find
  if (!response.data) {
    console.error("No data found for response with id:", response.id);
    return null;
  }

  // Extract name information
  let nameData = response.data.find((item) => item.label === "Name");
  let firstNameData = response.data.find(
    (item) =>
      item.label.toLowerCase() === "firstname" ||
      item.label.toLowerCase() === "first name"
  );
  let lastNameData = response.data.find(
    (item) =>
      item.label.toLowerCase() === "lastname" ||
      item.label.toLowerCase() === "last name"
  );

  let initials;
  let fullName;

  if (nameData) {
    fullName = nameData.value;
    const nameParts = nameData.value.split(" ");
    if (nameParts.length > 1) {
      initials = `${nameParts[0][0]?.toUpperCase() || ""}${
        nameParts[nameParts.length - 1][0]?.toUpperCase() || ""
      }`;
    } else {
      initials = nameData.value.slice(0, 2)?.toUpperCase() || "AN";
    }
  } else if (firstNameData && lastNameData) {
    fullName = `${firstNameData.value || ""} ${
      lastNameData.value || ""
    }`.trim();
    initials = `${firstNameData.value?.charAt(0)?.toUpperCase() || ""}${
      lastNameData.value?.charAt(0)?.toUpperCase() || ""
    }`;
    if (initials.length === 0) initials = "AN";
  } else if (firstNameData) {
    fullName = firstNameData.value || "Anonymous";
    initials = (firstNameData.value || "Anonymous").slice(0, 2).toUpperCase();
  } else if (lastNameData) {
    fullName = lastNameData.value || "Anonymous";
    initials = (lastNameData.value || "Anonymous").slice(0, 2).toUpperCase();
  } else {
    fullName = "Anonymous";
    initials = "AN";
  }

  // Find location or type of response
  const locationOrType = response.formType || "Unknown";

  // Find the message or feedback from the response with type textarea
  const messageData = response.data.find((item) => item.type === "textarea");

  // Calculate time difference in human-readable format
  const submissionDate = new Date(response.submissionDate);
  const now = new Date();
  const diffInMs = now - submissionDate;
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
  const diffInDays = Math.floor(diffInHours / 24);

  let timeAgo;
  if (diffInDays > 0) {
    timeAgo = `${diffInDays} days ago`;
  } else {
    timeAgo = `${diffInHours} hr${diffInHours !== 1 ? "s" : ""} ago`;
  }

  return (
    <section className="border-b border-gray-400 pb-6 pt-2">
      <div className="flex items-start space-x-4 p-4">
        {/* Avatar */}
        <div className="w-12 h-12 flex items-center justify-center bg-bulb-blue text-bulb-yellow rounded-full text-xl font-bold shadow-md">
          {initials}
        </div>

        {/* Comment Details */}
        <div className="flex-1">
          <div className="flex justify-between items-center">
            <h2 className="text-base font-semibold text-gray-800">
              {fullName === "" ? "Anonymous" : fullName}
            </h2>
            <span className="text-sm text-gray-500">{timeAgo}</span>
          </div>
          <div className="text-sm text-gray-500">
            on {locationOrType} - #{response.id}
          </div>

          {/* Saved Messages */}
          {savedMessages.map((msg, index) => (
            <div
              key={index}
              className="bg-bulb-white p-2 rounded-md mt-2 flex justify-between items-center"
            >
              <p className="text-sm text-gray-700">{msg}</p>
              <button
                onClick={() => handleDeleteMessage(index)}
                className="text-red-500 hover:text-red-700"
              >
                <X size={16} />
              </button>
            </div>
          ))}

          {/* Message Input */}
          {messageOpen && (
            <div className="mt-4">
              <textarea
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                className="w-full p-3 border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-bulb-yellow"
                placeholder="Write a message..."
              />
              <div className="flex justify-between mt-2">
                <button
                  onClick={handleSaveMessage}
                  className="px-3 py-1 bg-bulb-success text-bulb-white text-[10px] rounded-[8px]"
                >
                  Save
                </button>
                {/* <button
                  onClick={() => setMessageOpen(false)}
                  className="px-3 py-1 bg-gray-200 text-gray-800 rounded-md"
                >
                  Close
                </button> */}
              </div>
            </div>
          )}

          {/* Feedback Message */}
          <p className="mt-2 text-sm text-gray-700">
            {messageData?.value || "No message"}
          </p>
        </div>
      </div>
      {/* Action Buttons */}
      <div className="flex justify-evenly mt-3">
        <button
          onClick={() => setMessageOpen(!messageOpen)}
          className="text-gray-500"
        >
          <img src={Message} alt="Message Icon" />
        </button>
        <button
          onClick={handleLike}
          className={`text-${isLiked ? "red" : "gray"}-500 hover:text-${
            isLiked ? "red" : "gray"
          }-700`}
        >
          <img src={WishIcon} alt="Like icon" />
        </button>
        <button onClick={handleDownload} className="text-gray-500">
          <img src={Expand} alt="Download Icon" />
        </button>
      </div>
    </section>
  );
};

export default RecentComment;

// VERY CORRECT

// import React from "react";

// const RecentComment = ({ response }) => {
//   // Check if response.data exists before calling find
//   if (!response.data) {
//     console.error("No data found for response with id:", response.id);
//     return null;
//   }

//   // Extract name information
//   let nameData = response.data.find((item) => item.label === "Name");
//   let firstNameData = response.data.find(
//     (item) =>
//       item.label.toLowerCase() === "firstname" ||
//       item.label.toLowerCase() === "first name"
//   );
//   let lastNameData = response.data.find(
//     (item) =>
//       item.label.toLowerCase() === "lastname" ||
//       item.label.toLowerCase() === "last name"
//   );

//   let initials;
//   let fullName;

//   if (nameData) {
//     fullName = nameData.value;
//     const nameParts = nameData.value.split(" ");
//     if (nameParts.length > 1) {
//       initials = `${nameParts[0][0]?.toUpperCase() || ""}${
//         nameParts[nameParts.length - 1][0]?.toUpperCase() || ""
//       }`;
//     } else {
//       initials = nameData.value.slice(0, 2)?.toUpperCase() || "AN";
//     }
//   } else if (firstNameData && lastNameData) {
//     fullName = `${firstNameData.value || ""} ${
//       lastNameData.value || ""
//     }`.trim();
//     initials = `${firstNameData.value?.charAt(0)?.toUpperCase() || ""}${
//       lastNameData.value?.charAt(0)?.toUpperCase() || ""
//     }`;
//     if (initials.length === 0) initials = "AN";
//   } else if (firstNameData) {
//     fullName = firstNameData.value || "Anonymous";
//     initials = (firstNameData.value || "Anonymous").slice(0, 2).toUpperCase();
//   } else if (lastNameData) {
//     fullName = lastNameData.value || "Anonymous";
//     initials = (lastNameData.value || "Anonymous").slice(0, 2).toUpperCase();
//   } else {
//     fullName = "Anonymous";
//     initials = "AN";
//   }

//   // Find location or type of response
//   const locationOrType = response.formType || "Unknown";

//   // Find the message or feedback from the response with type textarea
//   const messageData = response.data.find((item) => item.type === "textarea");

//   // Calculate time difference in human-readable format
//   const submissionDate = new Date(response.submissionDate);
//   const now = new Date();
//   const diffInMs = now - submissionDate;
//   const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
//   const diffInDays = Math.floor(diffInHours / 24);

//   let timeAgo;
//   if (diffInDays > 0) {
//     timeAgo = `${diffInDays} days ago`;
//   } else {
//     timeAgo = `${diffInHours} hr${diffInHours !== 1 ? "s" : ""} ago`;
//   }

//   return (
//     <section className="border-b border-b-gray-400">
//       <div className="p-4">
//         <div className="flex items-center">
//           <div className="w-14 h-14 bg-bulb-blue text-bulb-yellow flex items-center justify-center rounded-full text-2xl font-bold mr-4">
//             {initials}
//           </div>
//           <div className="flex-grow">
//             <div className="font-semibold flex justify-between">
//               <h2>{fullName === "" ? "Anonymous" : fullName}</h2>
//               <span className="text-sm text-gray-500">{timeAgo}</span>
//             </div>
//             <div className="text-sm text-gray-500">
//               on {locationOrType} - #{response.id}
//             </div>
//           </div>
//         </div>
//         <div className="p-2">
//           <p className="pl-12">
//             {messageData ? messageData.value : "No message"}
//           </p>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default RecentComment;
