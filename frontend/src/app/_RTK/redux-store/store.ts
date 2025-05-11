import { configureStore } from "@reduxjs/toolkit";
import { api } from "../RTK-query/query";
import userAuth from "../redux-slices/UserAuth";
const store = configureStore({
  reducer: {
    user: userAuth,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(),
  devTools: process.env.NODE_ENV === "development",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
