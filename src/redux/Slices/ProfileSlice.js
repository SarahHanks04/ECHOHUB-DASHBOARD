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
        ...action.payload,
      };
    },
    updateAddress(state, action) {
      state.Address = {
        ...state.Address,
        ...action.payload,
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
      if (personalInfo) state.personalInfo = personalInfo;
      if (Address) state.Address = Address;
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
