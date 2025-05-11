"use client";
import axiosInstance from "@/lib/API/axiosInstance";
import { useCallback, useEffect } from "react";
import { useUserSelector } from "../hooks/appSelector";
import { useAppDispatch } from "../hooks/appDispatch";
import { logout } from "../_RTK/redux-slices/UserAuth";

const RefreshToken = () => {
  const user = useUserSelector();
  const dispatch = useAppDispatch();
  const refresh = useCallback(async () => {
    if (user.isLoggedIn) {
      const res = await axiosInstance.post("/auth/refresh-token");
      if (res.status !== 200) {
        dispatch(logout());
      }
      return res;
    }
  }, [dispatch, user]);

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
