import { configureStore } from "@reduxjs/toolkit";

import imageProductReducer from "./slices/imageProductSlice";
import cartReducer from "./slices/cartSlice";
import carrouselReducer from "./slices/carrouselSlice";

export const store = configureStore({
  reducer: {
    imageProduct: imageProductReducer,
    cart: cartReducer,
    carrousel: carrouselReducer,
  },
});
