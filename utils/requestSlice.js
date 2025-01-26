import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
  name: "requests",
  initialState: null,
  reducers: {
    addRequest: (state, action) => {
      return action.payload;
    },
    removeRequest: (state, action) => {
      const reqAfterRemoval = state.filter((r) => r._id !== action.payload);
      return reqAfterRemoval;
    },
  },
});

export default requestSlice.reducer;
export const { addRequest, removeRequest } = requestSlice.actions;
