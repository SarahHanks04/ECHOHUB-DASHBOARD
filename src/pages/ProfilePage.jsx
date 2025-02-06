import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import ProfileImage from "@/components/ProfileComp/ProfileImage";
import EditableSection from "@/components/ProfileComp/EditableSection";
import {
  saveProfileToBackend,
  updateLastUpdated,
} from "@/redux/Slices/ProfileSlice";

const ProfilePage = () => {
  const profile = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClose = () => {
    navigate(-1);
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
          className="bg-bulb-blue text-white text-[13px] px-4 py-2 rounded"
          onClick={handleSaveChanges}
        >
          Save Changes
        </button>
        <button
          className="bg-bulb-yellow text-[#4A4848] text-[13px] px-6 py-2 rounded"
          onClick={handleClose}
        >
          Close
        </button>
      </motion.div>
    </motion.section>
  );
};

export default ProfilePage;
