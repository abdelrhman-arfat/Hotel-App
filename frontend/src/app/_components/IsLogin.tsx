"use client";
import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useUserSelector } from "@/app/hooks/appSelector";

const IsLogin = ({ children }: { children: React.ReactNode }) => {
  const user = useUserSelector();

  if (user.isLoggedIn) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 ">
      <div className="bg-white/80 backdrop-blur-sm p-10 rounded-2xl shadow-2xl max-w-lg w-full animate-fade-in border border-purple-100">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-6 text-center animate-slide-down">
          Welcome Back!
        </h2>
        <p className="text-gray-700 text-center mb-8 animate-fade-in-up leading-relaxed">
          To access your profile and unlock all features, please sign in to your
          account.
        </p>
        <div className="text-center">
          <Link
            href="/login"
            className="inline-block w-full transition-all duration-300 "
          >
            <Button className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white focus:ring-2 focus:ring-purple-300 rounded-xl py-3 px-6 text-base font-medium shadow-lg hover:shadow-purple-200 ">
              Sign In Now
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default IsLogin;
