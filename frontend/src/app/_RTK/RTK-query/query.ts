import { BACKEND_URL } from "@/app/constants/ENV";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: BACKEND_URL,
    credentials: "include",
  }),
  endpoints: (b) => ({
    getMe: b.query({
      query: () => "/auth/me",
    }),
  }),
});

export const { useGetMeQuery } = api;
