import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { User2, Edit3 } from "lucide-react";
import { uploadProfileImage, fetchProfile } from "../../redux/Slices/ProfileSlice";

const ProfileImage = () => {
  const dispatch = useDispatch();
  const { profileImage, personalInfo } = useSelector((state) => state.profile);
  const imageRef = useRef(null);

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      dispatch(uploadProfileImage(file)); 
    }
  };

  return (
    <section className="flex flex-col items-center sm:flex-row sm:items-center sm:space-x-8 p-4 rounded shadow-md border border-gray-300 bg-bulb-white">
      {/* Profile Image */}
      <div
        className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full flex justify-center items-center bg-gray-200 overflow-hidden mb-4 sm:mb-0 cursor-pointer"
      >
        {profileImage === "User2" ? (
          <>
            <User2 size={40} color="#4A4848" />
            <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50">
              <Edit3 size={20} color="#FFFFFF" />
            </div>
          </>
        ) : (
          <div className="w-full h-full overflow-hidden relative">
            <img
              ref={imageRef}
              src={profileImage}
              alt="Profile"
              className="w-full h-full object-cover absolute top-0 left-0"
            />
          </div>
        )}
        <input
          type="file"
          onChange={handleUpload}
          className="absolute inset-0 opacity-0 cursor-pointer"
        />
      </div>

      {/* Profile Details */}
      <div className="text-center sm:text-left">
        <h2 className="text-lg font-semibold text-[#000000]">
          {personalInfo?.firstName || "Full Name"}{" "}
          {personalInfo?.lastName || ""}
        </h2>
        <p className="text-sm text-[#4A4848]">
          {personalInfo?.role || "Community Manager"}
        </p>
      </div>
    </section>
  );
};

export default ProfileImage;


// import React, { useEffect, useRef, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { User2, Edit3 } from "lucide-react";
// import {
//   uploadProfileImage,
//   fetchProfile,
// } from "../../redux/Slices/ProfileSlice";

// const ProfileImage = () => {
//   const dispatch = useDispatch();
//   const { profileImage, personalInfo } = useSelector((state) => state.profile);
//   const [isHovering, setIsHovering] = useState(false);
//   const imageRef = useRef(null);

//   useEffect(() => {
//     dispatch(fetchProfile());
//   }, [dispatch]);

//   const handleUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       dispatch(uploadProfileImage(file));
//     }
//   };

//   const onMouseEnter = () => setIsHovering(true);
//   const onMouseLeave = () => setIsHovering(false);

//   return (
//     <section className="flex flex-col items-center sm:flex-row sm:items-center sm:space-x-8 p-4 rounded shadow-md border border-gray-300 bg-bulb-white">
//       {/* Profile Image */}
//       <div
//         className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full flex justify-center items-center bg-gray-200 overflow-hidden mb-4 sm:mb-0 cursor-pointer"
//         onMouseEnter={onMouseEnter}
//         onMouseLeave={onMouseLeave}
//       >
//         {profileImage === "User2" ? (
//           <User2 size={40} color="#4A4848" />
//         ) : (
//           <div className="w-full h-full overflow-hidden relative">
//             <img
//               ref={imageRef}
//               src={profileImage}
//               alt="Profile"
//               className="w-full h-full object-cover absolute top-0 left-0"
//             />
//           </div>
//         )}
//         {isHovering && (
//           <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50">
//             <Edit3 size={20} color="#FFFFFF" />
//           </div>
//         )}
//         <input
//           type="file"
//           onChange={handleUpload}
//           className="absolute inset-0 opacity-0 cursor-pointer"
//         />
//       </div>

//       {/* Profile Details */}
//       <div className="text-center sm:text-left">
//         <h2 className="text-lg font-semibold text-[#000000]">
//           {personalInfo?.firstName || "Full Name"}{" "}
//           {personalInfo?.lastName || ""}
//         </h2>
//         <p className="text-sm text-[#4A4848]">
//           {personalInfo?.role || "Community Manager"}
//         </p>
//       </div>
//     </section>
//   );
// };

// export default ProfileImage;
