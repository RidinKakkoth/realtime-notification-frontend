// import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//   token: localStorage.getItem('token') || null,
//   user: null,
//   role:null
// };

// const userSlice = createSlice({
//   name: 'user',
//   initialState,
//   reducers: {
//     login: (state, action) => {
//       state.token = action.payload.token;
//       state.user = action.payload.user;
//       state.role = action.payload.role;
//       localStorage.setItem('token', action.payload.token);
//     },
//     logout: (state) => {
//       state.token = null;
//       state.user = null;
//       state.role = null;
//       localStorage.removeItem('token');
//     },
//   },
// });

// export const { login, logout } = userSlice.actions;
// export default userSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: localStorage.getItem('token') || null,
  user: null,  // Initially, user is null
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.token = action.payload.token;  // Set the token
      state.user = action.payload.user;    // Set the entire user object (including role, name, etc.)
      localStorage.setItem('token', action.payload.token);  // Save token to localStorage
    },
    logout: (state) => {
      state.token = null;
      state.user = null;  // Clear user data on logout
      localStorage.removeItem('token');  // Remove token from localStorage
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
