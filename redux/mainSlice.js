import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

const initialState = {
  darkMode: Cookies.get('darkMode') === 'ON' ? true : false,
  cart: {
    items: Cookies.get('cart') ? JSON.parse(Cookies.get('cart')) : [],
  },
};

const darkModeSlice = createSlice({
  name: 'darkMode',
  initialState,
  reducers: {
    DARK_MODE_ON: (state) => {
      state.darkMode = true;
    },

    DARK_MODE_OFF: (state) => {
      state.darkMode = false;
    },

    addToCart: (state, action) => {
      const existItem = state.cart.items.find(
        (item) => item.id === action.payload._id
      );

      if (!existItem) {
        state.cart.items.push({
          id: action.payload._id,
          name: action.payload.name,
          price: action.payload.price,
          image: action.payload.image,
          quantity: 1,
        });

        Cookies.set('cart', JSON.stringify(state.cart.items));
      } else {
        let index = state.cart.items.indexOf(existItem);
        state.cart.items[index].quantity += 1;

        Cookies.set('cart', JSON.stringify(state.cart.items));
      }
    },

    changeToCartQuantity: (state, action) => {
      state.cart.items.find((item) => item.id === action.payload.id).quantity =
        Number(action.payload.val);

      Cookies.set('cart', JSON.stringify(state.cart.items));
    },

    removeFromCart: (state, action) => {
      let newState = state.cart.items.filter(
        (item) => item.id !== action.payload.id
      );

      state.cart.items = newState;

      Cookies.set('cart', JSON.stringify(state.cart.items));
    },

    setEmptyCart: (state, action) => {
      state.cart.items = null;
    },
  },
});

export const {
  DARK_MODE_ON,
  DARK_MODE_OFF,
  addToCart,
  changeToCartQuantity,
  removeFromCart,
  setEmptyCart,
} = darkModeSlice.actions;

// Selectors
export const selectDarkMode = (state) => state.main.darkMode;
export const selectCart = (state) => state.main.cart;
export const selectStockControl = (state) => state.main.cart.stockControl;

export default darkModeSlice.reducer;
