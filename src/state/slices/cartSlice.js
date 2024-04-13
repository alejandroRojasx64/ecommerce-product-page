import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "Fall Limited Edition Sneakers",
  img: "../../public/images/image-product-1.jpg",
  price: 125,
  totalOfProducts: 0,
  cartIsOpen: false,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, actions) => {
      state.totalOfProducts += parseInt(actions.payload, 10);
    },
    deleteToCart: (state) => {
      state.totalOfProducts -= parseInt(1, 10);
    },
    setCartIsOpen: (state) => {
      state.cartIsOpen = !state.cartIsOpen;
    },
  },
});

export const { addToCart, deleteToCart, setCartIsOpen } = cartSlice.actions;

export default cartSlice.reducer;
