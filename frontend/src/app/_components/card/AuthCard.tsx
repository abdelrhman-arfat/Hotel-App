"use client";
import UserCard from "./UserCard";
import { useUserSelector } from "@/app/hooks/appSelector";
import AuthLinks from "../AuthLinks";

const AuthCard = () => {
  const user = useUserSelector();
  return user.isLoggedIn ? (
    <UserCard
      user={{
        fullname: user.user?.fullname ?? "",
        image: user.user?.image ?? "",
      }}
    />
  ) : (
    <AuthLinks />
  );
};

export default AuthCard;
