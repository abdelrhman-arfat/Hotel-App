"use client";
import { setUserAuth } from "@/app/_RTK/redux-slices/UserAuth";
import { useAppDispatch } from "@/app/hooks/appDispatch";
import axiosInstance from "@/lib/API/axiosInstance";
import { Loader2 } from "lucide-react";
import React, { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Page = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const getUser = useCallback(async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get("/auth/me");
      if ([200, 201].includes(res.status)) {
        dispatch(setUserAuth(res.data.data.data));
        setMessage("Successfully authenticated!");
        setIsAuthenticated(true);
        setTimeout(() => {
          router.push("/");
        }, 5000);
      }
    } catch {
      setMessage("Something went wrong. Please try again.");
      setIsAuthenticated(false);
      setTimeout(() => {
        router.replace("/login");
      }, 5000);
    } finally {
      setLoading(false);
    }
  }, [dispatch, router]);

  useEffect(() => {
    getUser();
  }, [getUser]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-purple-100">
      {loading ? (
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-gray-600" />
          <p className="mt-4 text-gray-700 font-semibold">
            Loading your profile...
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full mx-4">
          <div
            className={`text-center ${isAuthenticated ? "text-green-600" : "text-red-600"}`}
          >
            <h2 className="text-2xl font-bold mb-2">
              {isAuthenticated ? "Welcome Back! 🎉" : "Oops! 😕"}
            </h2>
            <p className="text-lg">{message}</p>
            <p className="mt-4 text-gray-600">
              {isAuthenticated
                ? "Redirecting to home page in 5 seconds..."
                : "Redirecting to login page in 5 seconds..."}
            </p>
            <Link
              href={isAuthenticated ? "/" : "/login"}
              className="mt-4 inline-block text-blue-600 hover:text-blue-800 underline"
            >
              Click here to go {isAuthenticated ? "home" : "to login"} now
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
