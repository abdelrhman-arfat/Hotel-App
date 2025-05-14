import { combineReducers } from "@reduxjs/toolkit";
import userAuth from "@/app/_RTK/redux-slices/UserAuth";
import filterSlice from "@/app/_RTK/redux-slices/FilterSlice";
import storageSession from "redux-persist/lib/storage/session";
import { persistReducer } from "redux-persist";
import { api } from "../RTK-query/query";

export const allReducers = combineReducers({
  user: userAuth,
  filter: filterSlice,
  [api.reducerPath]: api.reducer,
});

const persistConfig = {
  key: "root",
  storage: storageSession,
  whitelist: ["user", "filter"],
};

export const persistedReducer = persistReducer(persistConfig, allReducers);
