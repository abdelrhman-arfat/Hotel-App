import { BACKEND_URL } from "@/app/constants/ENV";
import { TResponse } from "@/app/types/Response";
import { TReview } from "@/app/types/Review";
import { TRoom } from "@/app/types/Room";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

type TRoomQuery = {
  title?: string;
  minPrice?: number;
  familyCount?: number;
  page?: number;
  maxPrice?: number;
};

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: BACKEND_URL,
    credentials: "include",
  }),
  endpoints: (b) => ({
    getFeaturedRooms: b.query<TResponse<TRoom[]>, void>({
      query: () => "/room/featured",
    }),
    getAllRooms: b.query<TResponse<TRoom[]>, TRoomQuery>({
      query: ({ title, maxPrice, minPrice, familyCount, page = 1 }) =>
        `/room/?page=${page}&title=${title}&maxPrice=${maxPrice}&minPrice=${minPrice}&familyCount=${familyCount}`,
    }),
    getRoomById: b.query({
      query: (id) => `/room/get-by-id/${id}`,
    }),
    getSomeReviews: b.query<TResponse<TReview[]>, void>({
      query: () => `/review/some-reviews/`,
    }),
  }),
});

export const {
  useGetFeaturedRoomsQuery,
  useGetRoomByIdQuery,
  useGetSomeReviewsQuery,
  useGetAllRoomsQuery,
} = api;
