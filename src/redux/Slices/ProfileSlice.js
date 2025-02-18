import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"; 

// Thunk for saving profile data to the backend
export const saveProfileToBackend = createAsyncThunk(
  "profile/saveProfileToBackend",
  async (profileData, { rejectWithValue }) => {
    try {
      const response = await axios.post("http://localhost:5000/profile", profileData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data); 
    }
  }
);

// Thunk for fetching profile data from the backend
export const fetchProfile = createAsyncThunk(
  "profile/fetchProfile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("http://localhost:5000/profile");
      return response.data; 
    } catch (error) {
      return rejectWithValue(error.response.data); 
    }
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
  editing: {
    personalInfo: false,
  },
  loading: false,
  error: null,
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
    setEditing(state, action) {
      const { section, isEditing } = action.payload;
      state.editing[section] = isEditing;
    },
  },
  extraReducers: (builder) => {
    builder
      // Save Profile
      .addCase(saveProfileToBackend.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(saveProfileToBackend.fulfilled, (state, action) => {
        state.loading = false;
        state.personalInfo = action.payload.personalInfo; 
        state.lastUpdated = new Date().toLocaleString(); 
      })
      .addCase(saveProfileToBackend.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; 
      })

      // Fetch Profile
      .addCase(fetchProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.personalInfo = action.payload.personalInfo; 
        state.lastUpdated = action.payload.lastUpdated;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { updateProfileImage, updatePersonalInfo, setEditing } = profileSlice.actions;

export default profileSlice.reducer;


// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// // Thunk for saving profile data to the backend
// export const saveProfileToBackend = createAsyncThunk(
//   "profile/saveProfileToBackend",
//   async (profileData) => {
//     const response = await fetch("http://localhost:5000/profile", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(profileData),
//     });
//     if (!response.ok) {
//       throw new Error("Failed to save profile data.");
//     }
//     return await response.json();
//   }
// );

// export const fetchProfile = createAsyncThunk(
//   "profile/fetchProfile",
//   async () => {
//     const response = await fetch("http://localhost:5000/profile");
//     if (!response.ok) {
//       throw new Error("Failed to fetch profile data.");
//     }
//     return await response.json();
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
//   editing: {
//     personalInfo: false,
//   },
// };

// const profileSlice = createSlice({
//   name: "profile",
//   initialState,
//   reducers: {
//     updateProfileImage(state, action) {
//       state.profileImage = action.payload;
//     },
//     updatePersonalInfo(state, action) {
//       state.personalInfo = {
//         ...state.personalInfo,
//         ...action.payload,
//       };
//     },
//     setEditing(state, action) {
//       const { section, isEditing } = action.payload;
//       state.editing[section] = isEditing;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(saveProfileToBackend.fulfilled, (state, action) => {
//         const { personalInfo } = action.payload;
//         if (personalInfo) state.personalInfo = personalInfo;
//         state.lastUpdated = new Date().toLocaleString();
//       })
//       .addCase(fetchProfile.fulfilled, (state, action) => {
//         const { personalInfo } = action.payload;
//         if (personalInfo) state.personalInfo = personalInfo;
//       });
//   },
// });

// export const { updateProfileImage, updatePersonalInfo, setEditing } =
//   profileSlice.actions;

// export default profileSlice.reducer;

