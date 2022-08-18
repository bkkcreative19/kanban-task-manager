import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:5000/api"
    : "https://kris-taskmanager.com/api";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
  tagTypes: ["Board", "Column", "Task"],
  endpoints: (builder) => ({}),
});
