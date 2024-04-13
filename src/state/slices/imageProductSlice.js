import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  indexImage: 1,
  carrousel: false,
  imageSelected: 1,
  numberOfProducts: 1,
};

export const imageProductSlice = createSlice({
  name: "imageProduct",
  initialState,
  reducers: {
    selectImage: (state, actions) => {
      state.indexImage = actions.payload;
      state.imageSelected = actions.payload;
    },
    openCarrousel: (state) => {
      state.carrousel = true;
    },
    closedCarrousel: (state) => {
      state.carrousel = false;
    },
    incrementProducts: (state, actions) => {
      state.numberOfProducts = actions.payload;
    },
    decrementProducts: (state, actions) => {
      state.numberOfProducts = actions.payload;
    },
  },
});

export const {
  selectImage,
  openCarrousel,
  closedCarrousel,
  incrementProducts,
  decrementProducts,
} = imageProductSlice.actions;

export default imageProductSlice.reducer;
