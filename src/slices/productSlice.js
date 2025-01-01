import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: [],
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setAllProducts: (state, action) => {
      state.products = action.payload;
    },
    addNewProduct: (state, action) => {
      state.products.push(action.payload);
    },
    updateExistingProduct: (state, action) => {
      const index = state.products.findIndex(product => product._id === action.payload._id);
      if (index !== -1) {
        state.products[index] = action.payload;
      }
    },
    deleteProduct: (state, action) => {
      state.products = state.products.filter(product => product._id !== action.payload);
    },
    toggleListed(state, action) {
      const productId = action.payload;
      const product = state.products.find((p) => p._id === productId);
      if (product) {
        product.listed = !product.listed;
      }
    },
    subscribingProduct: (state, action) => {
      const product = state.products.find(p => p._id === action.payload);
      if (product) product.subscribed = true;
    },
    unsubscribingProduct: (state, action) => {
      const product = state.products.find(p => p._id === action.payload);
      if (product) product.subscribed = false;
    },
  },
});

export const { 
  setAllProducts, 
  addNewProduct, 
  updateExistingProduct, 
  deleteProduct, 
  subscribingProduct, 
  unsubscribingProduct ,
  toggleListed
} = productSlice.actions;

export default productSlice.reducer;
