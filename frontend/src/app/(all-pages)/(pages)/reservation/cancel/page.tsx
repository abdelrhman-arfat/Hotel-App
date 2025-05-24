"use client";

import Link from "next/link";
import React from "react";
import { XCircle } from "lucide-react";

const CancelPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gray-50">
      <div className="max-w-md w-full bg-white shadow-lg rounded-2xl p-8 text-center">
        <div className="flex justify-center mb-4">
          <XCircle className="w-16 h-16 text-red-500" />
        </div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Payment Canceled
        </h1>
        <p className="text-gray-600 mb-6">
          Your reservation process was canceled. If this was a mistake or
          you&apos;d like to try again, feel free to return and make a new
          reservation.
        </p>
        <div className="flex justify-center gap-4">
          <Link
            href="/"
            className="px-5 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors"
          >
            Back to Home
          </Link>
          <Link
            href="/rooms"
            className="px-5 py-2 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors"
          >
            View Rooms
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CancelPage;
