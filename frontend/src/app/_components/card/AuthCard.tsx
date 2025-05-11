"use client";
import UserCard from "./UserCard";
import { useUserSelector } from "@/app/hooks/appSelector";
import AuthLinks from "../Links/AuthLinks";

const AuthCard = () => {
  const user = useUserSelector();
  return user.isLoggedIn ? (
    <UserCard
      user={{
        fullName: user.user?.fullname ?? "",
        image: user.user?.image ?? "",
      }}
    />
  ) : (
    <AuthLinks />
  );
};

export default AuthCard;
