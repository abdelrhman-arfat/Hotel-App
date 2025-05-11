"use client";

import { FormEvent, ReactNode } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

type LoginFormProps = {
  children?: ReactNode; // For Google auth or other buttons
};

const LoginForm = ({ children }: LoginFormProps) => {
  const handleLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    console.log(formData.get("email"));
    console.log(formData.get("password"));
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative">
      <Card className="w-full max-w-sm shadow-md p-4">
        <CardHeader className="text-center">
          <CardTitle className="text-xl">
            Login to{" "}
            <Link
              href={"/"}
              className="font-bold text-yellow-500 hover:text-yellow-600 cursor-pointer transition-colors duration-200"
            >
              Hotel
            </Link>
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleLogin} className="space-y-6">
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
              Login
            </Button>
          </form>
          {children && <div className="pt-2 my-2">{children}</div>}

          <div className="text-center mt-6 text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-blue-600 hover:underline">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginForm;
