import React from "react";
import FeedbackColored from "../../assets/Icons/FeedbackColored.svg";

const RecentCard = ({ title, subTitle, count, onClick }) => (
  <div
    className="flex-1 p-6 bg-bulb-white shadow-lg rounded-lg cursor-pointer"
    onClick={onClick}
  >
    <h2 className="text-xl font-semibold">{title}</h2>
    <div className="flex items-start gap-3 mt-8">
      <img src={FeedbackColored} alt="Feedback Icon" size="40" />
      <div>
        <p>{subTitle}</p>
        <p className="text-lg">{count}</p>
      </div>
    </div>
  </div>
);

export default RecentCard;
