import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

const initialState = {
  user: Cookies.get('userInfo') ? JSON.parse(Cookies.get('userInfo')) : null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

// Selectors
export const selectUser = (state) => state.user.user;

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
