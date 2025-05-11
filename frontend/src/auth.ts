import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { BACKEND_TOKEN, BACKEND_URL } from "./app/constants/ENV";

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [Google],
  callbacks: {
    async signIn({ user }) {
      try {
        const res = await fetch(`${BACKEND_URL}/auth/login-signup`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${BACKEND_TOKEN}`,
          },
          body: JSON.stringify({
            email: user.email,
            fullName: user.name,
            image: user.image,
          }),
          credentials: "include",
        });

        if (!res.ok) {
          console.warn("Backend rejected the request", await res.text());
        }
      } catch (error) {
        console.error("Failed to send user data to backend:", error);
      }

      return true;
    },
    redirect: async () => {
      return "/";
    },
  },
});
