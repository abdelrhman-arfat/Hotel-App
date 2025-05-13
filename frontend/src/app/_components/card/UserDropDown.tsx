"use client";
import Link from "next/link";
import { LogOut, User } from "lucide-react";
import axiosInstance from "@/lib/API/axiosInstance";
import { toast } from "react-hot-toast";
import { useAppDispatch } from "@/app/hooks/appDispatch";
import { logout } from "@/app/_RTK/redux-slices/UserAuth";
const UserDropDown = () => {
  const dispatch = useAppDispatch();
  const logoutHandler = async () => {
    toast
      .promise(axiosInstance.post("/auth/logout"), {
        loading: "Logging out...",
        success: (res) => res.data.message || "Logged out successfully!",
        error: "There was an error logging out!",
      })
      .then(() => {
        dispatch(logout());
      });
  };
  return (
    <div className="absolute right-0 mt-2 w-44 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 z-50 overflow-hidden text-right">
      <Link
        href="/profile"
        className="flex items-center gap-2 px-4 py-3 text-sm text-gray-800 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
      >
        <User className="w-4 h-4 text-gray-500 dark:text-gray-400" />
        <span className="flex-1">Profile</span>
      </Link>

      <button
        onClick={logoutHandler}
        className="w-full flex items-center gap-2 px-4 py-3 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
      >
        <LogOut className="w-4 h-4" />
        <span className="flex-1">Log out</span>
      </button>
    </div>
  );
};

export default UserDropDown;
