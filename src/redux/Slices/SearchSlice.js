import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: "search",
  initialState: {
    term: "",
    results: [],
  },
  reducers: {
    setSearchTerm(state, action) {
      state.term = action.payload;
    },
    setResults(state, action) {
      state.results = action.payload;
    },
  },
});

export const { setSearchTerm, setResults } = searchSlice.actions;

export default searchSlice.reducer;
