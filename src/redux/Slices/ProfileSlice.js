// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { User2 } from "lucide-react";

// // export const saveProfileToBackend = createAsyncThunk(
// //   "profile/saveProfileToBackend",
// //   async (profileData) => {
// //     const response = await fetch("http://localhost:4000/profile", {
// //       method: "PUT",
// //       headers: {
// //         "Content-Type": "application/json",
// //       },
// //       body: JSON.stringify(profileData),
// //     });
// //     if (!response.ok) {
// //       throw new Error("Failed to save profile data.");
// //     }
// //     return profileData;
// //   }
// // );

// export const saveProfileToBackend = createAsyncThunk(
//   "profile/saveProfileToBackend",
//   async (profileData) => {
//     const response = await fetch("http://localhost:4000/profile", {
//       method: "PATCH", // Use PATCH to update specific fields
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(profileData),
//     });
//     if (!response.ok) {
//       throw new Error("Failed to save profile data.");
//     }
//     return await response.json(); // Return the updated profile data
//   }
// );

// const initialState = {
//   profileImage: "User2",
//   lastUpdated: "",
//   personalInfo: {
//     firstName: "",
//     lastName: "",
//     email: "",
//     phoneNumber: "",
//     username: "",
//     role: "",
//   },
//   Address: {
//     firstName: "",
//     lastName: "",
//     email: "",
//     phoneNumber: "",
//     username: "",
//   },
//   editing: {
//     personalInfo: false,
//     Address: false,
//   },
// };

// const profileSlice = createSlice({
//   name: "profile",
//   initialState,
//   reducers: {
//     updateProfileImage(state, action) {
//       state.profileImage = action.payload;
//     },
//     removeProfileImage(state) {
//       state.profileImage = "User2";
//     },
//     updatePersonalInfo(state, action) {
//       state.personalInfo = action.payload;
//     },
//     updateAddress(state, action) {
//       state.Address = action.payload;
//     },
//     setEditing(state, action) {
//       const { section, isEditing } = action.payload;
//       state.editing[section] = isEditing;
//     },
//     updateLastUpdated(state) {
//       state.lastUpdated = new Date().toLocaleString();
//     },
//   },
//   extraReducers: (builder) => {
//     builder.addCase(saveProfileToBackend.fulfilled, (state, action) => {
//       state.lastUpdated = new Date().toLocaleString();
//     });
//   },
// });

// export const {
//   updateProfileImage,
//   removeProfileImage,
//   updatePersonalInfo,
//   updateAddress,
//   setEditing,
//   updateLastUpdated,
// } = profileSlice.actions;

// export default profileSlice.reducer;

// THIRD TRY

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Thunk for saving profile data to the backend
export const saveProfileToBackend = createAsyncThunk(
  "profile/saveProfileToBackend",
  async (profileData) => {
    const response = await fetch("http://localhost:4000/profile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(profileData),
    });
    if (!response.ok) {
      throw new Error("Failed to save profile data.");
    }
    return await response.json();
  }
);

const initialState = {
  profileImage: "User2",
  lastUpdated: "",
  personalInfo: {
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    username: "",
    role: "",
  },
  Address: {
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    username: "",
  },
  editing: {
    personalInfo: false,
    Address: false,
  },
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    updateProfileImage(state, action) {
      state.profileImage = action.payload;
    },
    updatePersonalInfo(state, action) {
      state.personalInfo = {
        ...state.personalInfo,
        ...action.payload, // Merged personal info updates
      };
    },
    updateAddress(state, action) {
      state.Address = {
        ...state.Address,
        ...action.payload, // Merged address updates
      };
    },
    setEditing(state, action) {
      const { section, isEditing } = action.payload;
      state.editing[section] = isEditing;
    },
    updateLastUpdated(state) {
      state.lastUpdated = new Date().toLocaleString();
    },
  },
  extraReducers: (builder) => {
    builder.addCase(saveProfileToBackend.fulfilled, (state, action) => {
      const { personalInfo, Address } = action.payload;
      if (personalInfo) state.personalInfo = personalInfo; // Update state with saved data
      if (Address) state.Address = Address; // Update address section if included
      state.lastUpdated = new Date().toLocaleString();
    });
  },
});

export const {
  updateProfileImage,
  updatePersonalInfo,
  updateAddress,
  setEditing,
  updateLastUpdated,
} = profileSlice.actions;

export default profileSlice.reducer;
