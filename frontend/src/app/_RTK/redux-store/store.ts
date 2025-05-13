import { configureStore } from "@reduxjs/toolkit";
import { api } from "../RTK-query/query";
import userAuth from "../redux-slices/UserAuth";
import filterSlice from "../redux-slices/FilterSlice";
const store = configureStore({
  reducer: {
    user: userAuth,
    filter: filterSlice,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
  devTools: process.env.NODE_ENV === "development",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
