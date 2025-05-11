"use client";

import { FormEvent, ReactNode } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

type SignUpFormProps = {
  children?: ReactNode; // e.g., Google signup button
};

const SignUpForm = ({ children }: SignUpFormProps) => {
  const handleSign = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    console.log("Full Name:", formData.get("fullName"));
    console.log("Email:", formData.get("email"));
    console.log("Password:", formData.get("password"));
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <Card className="w-full max-w-sm shadow-md p-4">
        <CardHeader className="text-center">
          <CardTitle className="text-xl">
            Sign up to{" "}
            <Link
              href="/"
              className="font-bold text-yellow-500 hover:text-yellow-600 transition-colors"
            >
              Hotel
            </Link>
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSign} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                name="fullName"
                type="text"
                placeholder="Enter your full name"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Enter your password"
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-yellow-400 hover:bg-yellow-600 text-white"
            >
              Sign Up
            </Button>
          </form>

          {children && <div className="pt-2 my-2">{children}</div>}

          <div className="text-center mt-6 text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-600 hover:underline">
              Login
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignUpForm;
