import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  indexCarrouselImage: 1,
};

export const carrouselSlice = createSlice({
  name: "carrousel",
  initialState,
  reducers: {
    imageSelected: (state, actions) => {
      state.indexCarrouselImage = parseInt(actions.payload, 10);
    },
    initializingImage: (state, actions) => {
      state.indexCarrouselImage = parseInt(actions.payload, 10);
    },
  },
});

export const { imageSelected, initializingImage } = carrouselSlice.actions;

export default carrouselSlice.reducer;
