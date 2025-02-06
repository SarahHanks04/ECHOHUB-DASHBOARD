// import React from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { motion } from "framer-motion";
// import EditableSection from "../../Component/ProfileComp/EditableSection";
// import ProfileImage from "../../Component/ProfileComp/ProfileImage";
// import { updateLastUpdated } from "../../Redux/Slices/ProfileSlice";

// const ProfilePage = () => {
//   const lastUpdated = useSelector((state) => state.profile.lastUpdated);
//   const dispatch = useDispatch();

//   // Framer Motion Variants for Smooth Transition
//   const containerVariants = {
//     hidden: { opacity: 0, y: 50 },
//     visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
//   };

//   return (
//     <motion.section
//       className="container mx-auto pt-[7rem] p-4 space-y-10"
//       initial="hidden"
//       animate="visible"
//       variants={containerVariants}
//     >
//       {/* Header */}
//       <motion.header
//         className="flex flex-col sm:flex-row justify-between items-start px-4"
//         variants={containerVariants}
//       >
//         <h1 className="text-[20px] sm:text-[23px] font-semibold">My Profile</h1>
//         <div className="flex items-center gap-2">
//           <div className="w-[8px] h-[8px] bg-[#ACABAB] rounded-full"></div>
//           <span className="text-gray-500 text-[12px] sm:text-[13px]">
//             Last Updated: {lastUpdated}
//           </span>
//         </div>
//       </motion.header>

//       {/* Profile Image */}
//       <motion.div variants={containerVariants}>
//         <ProfileImage />
//       </motion.div>

//       {/* Editable Sections */}
//       <motion.div
//         className="space-y-6"
//         whileInView={{ opacity: 1, y: 0 }}
//         initial={{ opacity: 0, y: 50 }}
//         viewport={{ once: false }}
//       >
//         <EditableSection
//           section="personalInfo"
//           title="Personal Information"
//           fields={[
//             { name: "firstName", label: "First Name" },
//             { name: "lastName", label: "Last Name" },
//             { name: "email", label: "Email Address", type: "email" },
//             { name: "phoneNumber", label: "Phone Number", type: "tel" },
//           ]}
//         />

//         <EditableSection
//           section="Address"
//           title="Address"
//           fields={[
//             { name: "firstName", label: "First Name" },
//             { name: "lastName", label: "Last Name" },
//             { name: "email", label: "Email Address", type: "email" },
//             { name: "phoneNumber", label: "Phone Number", type: "tel" },
//             { name: "username", label: "Username" },
//           ]}
//         />
//       </motion.div>

//       {/* Footer Buttons */}
//       <motion.div
//         className="flex flex-col sm:flex-row sm:justify-start space-y-4 sm:space-y-0 sm:space-x-4 px-4"
//         variants={containerVariants}
//       >
//         <button
//           className="bg-[#FF6D06] text-white text-[13px] px-4 py-2 rounded"
//           onClick={() => dispatch(updateLastUpdated())}
//         >
//           Save Changes
//         </button>
//         <button className="bg-[#C7C6C6] text-[#4A4848] text-[13px] px-6 py-2 rounded">
//           Close
//         </button>
//       </motion.div>
//     </motion.section>
//   );
// };

// export default ProfilePage;

// SECOND TRY

// import React from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { motion } from "framer-motion";
// import {
//   saveProfileToBackend,
//   updateLastUpdated,
// } from "../../Redux/Slices/ProfileSlice";
// import ProfileImage from "../../Component/ProfileComp/ProfileImage";
// import EditableSection from "../../Component/ProfileComp/EditableSection";
// import { useNavigate } from "react-router-dom";

// const ProfilePage = () => {
//   const profile = useSelector((state) => state.profile);
//   const dispatch = useDispatch();

//   const navigate = useNavigate();

//   const handleClose = () => {
//     navigate(-1); // Navigates to the previous page
//   };

//   const handleSaveChanges = async () => {
//     await dispatch(saveProfileToBackend(profile));
//   };

//   return (
//     <motion.section
//       className=" pt-[0.5rem] max-w-5xl lg:ml-56 overflow-x-hidden p-2 space-y-7"
//       initial="hidden"
//       animate="visible"
//     >
//       {/* Header */}
//       <motion.header className="flex flex-col sm:flex-row justify-between items-start pt-8 px-2">
//         <h1 className="text-[20px] sm:text-[23px] font-semibold">My Profile</h1>
//         <div className="flex items-center gap-2">
//           <div className="w-[8px] h-[8px] bg-[#ACABAB] rounded-full"></div>
//           <span className="text-gray-500 text-[12px] sm:text-[13px]">
//             Last Updated: {profile.lastUpdated}
//           </span>
//         </div>
//       </motion.header>

//       {/* Profile Image */}
//       <ProfileImage />

//       {/* Editable Sections */}
//       <EditableSection
//         section="personalInfo"
//         title="Personal Information"
//         fields={[
//           { name: "firstName", label: "First Name", type: "text" },
//           { name: "lastName", label: "Last Name", type: "text" },
//           { name: "email", label: "Email Address", type: "email" },
//           { name: "phoneNumber", label: "Phone Number", type: "tel" },
//           { name: "role", label: "Role", type: "text" },
//         ]}
//       />
//       <EditableSection
//         section="Address"
//         title="Address"
//         fields={[
//           { name: "firstName", label: "First Name", type: "text" },
//           { name: "lastName", label: "Last Name", type: "text" },
//           { name: "email", label: "Email Address", type: "email" },
//           { name: "phoneNumber", label: "Phone Number", type: "tel" },
//           { name: "username", label: "Username" },
//         ]}
//       />

//       {/* Footer Buttons */}
//       <motion.div className="flex space-x-4 px-4">
//         {/* <button
//           className="bg-[#FF6D06] text-white text-[13px] px-4 py-2 rounded"
//           onClick={handleSaveChanges}
//         >
//           Save Changes
//         </button>
//         <button className="bg-[#C7C6C6] text-[#4A4848] text-[13px] px-6 py-2 rounded">
//           Close
//         </button> */}
//         {/* <button
//           className="bg-[#FF6D06] text-white text-[13px] px-4 py-2 rounded"
//           onClick={() => dispatch(updateLastUpdated())}
//         >
//           Save Changes
//         </button> */}
//         <button
//           className="bg-[#FF6D06] text-white text-[13px] px-4 py-2 rounded"
//           onClick={handleSaveChanges}
//         >
//           Save Changes
//         </button>
//         <button
//           className="bg-[#C7C6C6] text-[#4A4848] text-[13px] px-6 py-2 rounded"
//           onClick={handleClose}
//         >
//           Close
//         </button>
//       </motion.div>
//     </motion.section>
//   );
// };

// export default ProfilePage;

// THIRD TRY

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { motion } from "framer-motion";
import {
  saveProfileToBackend,
  updateLastUpdated,
} from "../../redux/Slices/ProfileSlice";
import ProfileImage from "../../Component/ProfileComp/ProfileImage";
import EditableSection from "../../Component/ProfileComp/EditableSection";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const profile = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClose = () => {
    navigate(-1); // Navigates to the previous page
  };

  const handleSaveChanges = async () => {
    try {
      await dispatch(saveProfileToBackend(profile));
      dispatch(updateLastUpdated());
    } catch (error) {
      console.error("Error saving profile:", error);
    }
  };

  return (
    <motion.section
      className=" pt-[0.5rem] max-w-5xl lg:ml-56 overflow-x-hidden p-2 space-y-7"
      initial="hidden"
      animate="visible"
    >
      <motion.header className="flex flex-col sm:flex-row justify-between items-start pt-8 px-2">
        <h1 className="text-[20px] sm:text-[23px] font-semibold">My Profile</h1>
        <div className="flex items-center gap-2">
          <div className="w-[8px] h-[8px] bg-[#ACABAB] rounded-full"></div>
          <span className="text-gray-500 text-[12px] sm:text-[13px]">
            Last Updated: {profile.lastUpdated}
          </span>
        </div>
      </motion.header>

      <ProfileImage />

      <EditableSection
        section="personalInfo"
        title="Personal Information"
        fields={[
          { name: "firstName", label: "First Name", type: "text" },
          { name: "lastName", label: "Last Name", type: "text" },
          { name: "email", label: "Email Address", type: "email" },
          { name: "phoneNumber", label: "Phone Number", type: "tel" },
          { name: "role", label: "Role", type: "text" },
        ]}
      />
      <EditableSection
        section="Address"
        title="Address"
        fields={[
          { name: "firstName", label: "First Name", type: "text" },
          { name: "lastName", label: "Last Name", type: "text" },
          { name: "email", label: "Email Address", type: "email" },
          { name: "phoneNumber", label: "Phone Number", type: "tel" },
          { name: "username", label: "Username" },
        ]}
      />

      <motion.div className="flex space-x-4 px-4">
        <button
          className="bg-[#FF6D06] text-white text-[13px] px-4 py-2 rounded"
          onClick={handleSaveChanges}
        >
          Save Changes
        </button>
        <button
          className="bg-[#C7C6C6] text-[#4A4848] text-[13px] px-6 py-2 rounded"
          onClick={handleClose}
        >
          Close
        </button>
      </motion.div>
    </motion.section>
  );
};

export default ProfilePage;
