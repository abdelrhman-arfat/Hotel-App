import React from "react";
import AuthLinks from "../Links/AuthLinks";
import UserCard from "./UserCard";
import { auth } from "@/auth";

const AuthCard = async () => {
  const session = await auth();

  return session && session.user ? (
    <UserCard
      user={{
        name: session.user.name ?? "",
        image: session.user.image ?? "",
      }}
    />
  ) : (
    <AuthLinks />
  );
};

export default AuthCard;
