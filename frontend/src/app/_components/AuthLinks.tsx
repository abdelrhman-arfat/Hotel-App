import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const AuthLinks = () => {
  return (
    <div className="flex gap-4 items-center">
      <Link href="/register">
        <Button
          variant="outline"
          className="w-full  cursor-pointer border-gold-500 bg-yellow-500 text-white transition-colors"
        >
          Register
        </Button>
      </Link>
      <Link href="/login">
        <Button
          variant="default"
          className="w-full cursor-pointer bg-white text-gray-800 hover:bg-gray-100 transition-colors"
        >
          Login
        </Button>
      </Link>
    </div>
  );
};
export default AuthLinks;
