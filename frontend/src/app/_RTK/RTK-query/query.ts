import { BACKEND_URL } from "@/app/constants/ENV";
import { TAnalytics } from "@/app/types/Analytics";
import { TUserQuery } from "@/app/types/QueryUsers";
import { TResponse } from "@/app/types/Response";
import { TReview } from "@/app/types/Review";
import { TRoom } from "@/app/types/Room";
import { TUser } from "@/app/types/User";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

type TRoomQuery = {
  title?: string;
  minPrice?: number;
  familyCount?: number;
  page?: number;
  maxPrice?: number;
};

type TEmpty = { s?: string } | undefined;

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: BACKEND_URL,
    credentials: "include",
  }),
  endpoints: (b) => ({
    getFeaturedRooms: b.query<TResponse<TRoom[]>, TEmpty>({
      query: () => "/room/featured",
    }),
    getAllRooms: b.query<TResponse<TRoom[]>, TRoomQuery>({
      query: ({ title, maxPrice, minPrice, familyCount, page = 1 }) =>
        `/room/?page=${page}&title=${title}&maxPrice=${maxPrice}&minPrice=${minPrice}&familyCount=${familyCount}`,
    }),
    getRoomById: b.query({
      query: (id) => `/room/get-by-id/${id}`,
    }),
    getSomeReviews: b.query<TResponse<TReview[]>, TEmpty>({
      query: () => `/review/some-reviews/`,
    }),
    getManagerAnalytics: b.query<TResponse<TAnalytics>, TEmpty | undefined>({
      query: () => `/manager/analytics`,
    }),
    getAllUsers: b.query<TResponse<TUser>, TUserQuery>({
      query: ({ role, page, orderBy }) =>
        `/manager/get-all-users?page=${page}&role=${role}&orderBy=${orderBy}`,
    }),
  }),
});

export const {
  useGetFeaturedRoomsQuery,
  useGetRoomByIdQuery,
  useGetSomeReviewsQuery,
  useGetAllRoomsQuery,
  useGetManagerAnalyticsQuery,
  useGetAllUsersQuery,
} = api;
