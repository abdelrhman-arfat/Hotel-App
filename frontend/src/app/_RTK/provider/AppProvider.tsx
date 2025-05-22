"use client";
import React from "react";
import { Provider } from "react-redux";
import store, { persistor } from "../redux-store/store";
import { PersistGate } from "redux-persist/integration/react";
import AppLoader from "@/app/_components/AppLoader";

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <PersistGate loading={<AppLoader />} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
};

export default AppProvider;
