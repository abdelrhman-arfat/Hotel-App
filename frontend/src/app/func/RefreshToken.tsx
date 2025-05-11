"use client";
import axiosInstance from "@/lib/API/axiosInstance";
import { useCallback, useEffect } from "react";
import { useAppDispatch } from "../hooks/appDispatch";
import { logout, setUserAuth } from "../_RTK/redux-slices/UserAuth";

const RefreshToken = () => {
  const dispatch = useAppDispatch();
  const refresh = useCallback(async () => {
    const res = await axiosInstance.post("/auth/refresh-token");
    if (res.status !== 200) {
      dispatch(logout());
    }
    dispatch(setUserAuth(res.data.data.data));
    return res;
  }, [dispatch]);

  useEffect(() => {
    refresh();
    const interval = setInterval(
      () => {
        refresh();
      },
      1000 * 60 * 10
    );

    return () => clearInterval(interval);
  });

  return null;
};

export default RefreshToken;
