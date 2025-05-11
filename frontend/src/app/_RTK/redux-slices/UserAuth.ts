import { createSlice } from "@reduxjs/toolkit";

type TUser = {
  email: string;
  image: string;
  fullname: string;
  role: string;
  id: number;
};

type initialState = {
  isLoggedIn: boolean;
  user: TUser | null;
};

const initialState: initialState = {
  isLoggedIn: false,
  user: null,
};

const userAuth = createSlice({
  name: "userAuth",
  initialState,
  reducers: {
    setUserAuth: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload;
      return state;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.user = null;
      return state;
    },
  },
});

export const { setUserAuth, logout } = userAuth.actions;
export default userAuth.reducer;
