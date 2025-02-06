// import React from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { User2 } from "lucide-react";
// import {
//   removeProfileImage,
//   updateProfileImage,
// } from "../../Redux/Slices/ProfileSlice";

// const ProfileImage = () => {
//   const dispatch = useDispatch();
//   const profileImage = useSelector((state) => state.profile.profileImage);

//   const handleUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = () => dispatch(updateProfileImage(reader.result));
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleRemove = () => dispatch(removeProfileImage());

//   return (
//     <section className="flex flex-col sm:flex-row sm:items-center sm:space-x-20 rounded shadow p-4 border-[1px] border-gray-300 bg-[#F9F6F4]">
//       <div className="w-28 h-28 rounded-full flex justify-center items-center bg-gray-200 ml-8 mb-4 sm:mb-0 overflow-hidden">
//         {profileImage === "User2" ? (
//           <User2 size={40} color="#4A4848" />
//         ) : (
//           <img
//             src={profileImage}
//             alt="Profile"
//             className="w-full h-full object-cover"
//           />
//         )}
//       </div>
//       <div className="flex space-x-6">
//         <label className="btn bg-[#FF6D06] text-white text-[13px] px-4 py-2 rounded cursor-pointer">
//           Upload New Picture
//           <input type="file" onChange={handleUpload} hidden />
//         </label>
//         <button
//           className="btn bg-[#C7C6C6] text-[#4A4848] text-[13px] px-4 py-2 rounded"
//           onClick={handleRemove}
//         >
//           Remove Picture
//         </button>
//       </div>
//     </section>
//   );
// };

// export default ProfileImage;

// import React from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { User2 } from "lucide-react";
// import { updateProfileImage } from "../../Redux/Slices/ProfileSlice";

// const ProfileImage = () => {
//   const dispatch = useDispatch();
//   const { profileImage, personalInfo } = useSelector((state) => state.profile);

//   const handleUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = () => dispatch(updateProfileImage(reader.result));
//       reader.readAsDataURL(file);
//     }
//   };

//   return (
//     <section className="flex flex-col items-center sm:flex-row sm:items-center sm:space-x-8 p-4 rounded shadow-md border border-gray-300 bg-[#F9F6F4]">
//       {/* Profile Image */}
//       <label className="w-24 h-24 sm:w-28 sm:h-28 rounded-full flex justify-center items-center bg-gray-200 overflow-hidden mb-4 sm:mb-0 cursor-pointer">
//         {profileImage === "User2" ? (
//           <User2 size={40} color="#4A4848" />
//         ) : (
//           <img
//             src={profileImage}
//             alt="Profile"
//             className="w-full h-full object-cover"
//           />
//         )}
//         <input type="file" onChange={handleUpload} hidden />
//       </label>

//       {/* Profile Details */}
//       <div className="text-center sm:text-left">
//         <h2 className="text-lg font-semibold text-[#000000]">
//           {personalInfo.firstName || "First Name"} {personalInfo.lastName || "Last Name"}
//         </h2>
//         <p className="text-sm text-[#4A4848]">
//           {personalInfo.role || "Community Manager"}
//         </p>
//       </div>
//     </section>
//   );
// };

// export default ProfileImage;

// THIRD TRY

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { User2 } from "lucide-react";
import { updateProfileImage } from "../../redux/Slices/ProfileSlice";

const ProfileImage = () => {
  const dispatch = useDispatch();
  const { profileImage, personalInfo } = useSelector((state) => state.profile);

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => dispatch(updateProfileImage(reader.result));
      reader.readAsDataURL(file);
    }
  };

  return (
    <section className="flex flex-col items-center sm:flex-row sm:items-center sm:space-x-8 p-4 rounded shadow-md border border-gray-300 bg-[#F9F6F4]">
      {/* Profile Image */}
      <label className="w-24 h-24 sm:w-28 sm:h-28 rounded-full flex justify-center items-center bg-gray-200 overflow-hidden mb-4 sm:mb-0 cursor-pointer">
        {profileImage === "User2" ? (
          <User2 size={40} color="#4A4848" />
        ) : (
          <img
            src={profileImage}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        )}
        <input type="file" onChange={handleUpload} hidden />
      </label>

      {/* Profile Details */}
      <div className="text-center sm:text-left">
        <h2 className="text-lg font-semibold text-[#000000]">
          {personalInfo.firstName || "First Name"}{" "}
          {personalInfo.lastName || "Last Name"}
        </h2>
        <p className="text-sm text-[#4A4848]">
          {personalInfo.role || "Community Manager"}
        </p>
      </div>
    </section>
  );
};

export default ProfileImage;
