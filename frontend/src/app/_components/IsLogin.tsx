"use client";

import React from "react";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useUserSelector } from "../hooks/appSelector";

const IsLogin = ({ children }: { children: React.ReactNode }) => {
  const user = useUserSelector();

  if (user.isLoggedIn) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-neutral-50">
      <div className="bg-white p-8 rounded-xl shadow-xl max-w-lg w-full">
        <h2 className="text-3xl font-semibold text-neutral-800 mb-4 text-center">
          Welcome Back!
        </h2>
        <p className="text-neutral-600 text-center mb-6">
          You are currently logged in to your account. Continue exploring your
          personalized dashboard.
        </p>
        <div className="text-center">
          <Link
            href="/"
            className="inline-block text-yellow-600 hover:text-yellow-700 transition-colors mb-4"
          >
            <Button className="w-full bg-yellow-500 text-white hover:bg-yellow-600 focus:outline-none rounded-lg py-2 px-4 text-sm">
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default IsLogin;
