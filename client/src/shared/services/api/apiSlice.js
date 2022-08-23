import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:5001/api"
    : "https://api-kris-taskmanager.onrender.com/api";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
  tagTypes: ["Boards", "Board", "Column", "Task"],
  endpoints: (builder) => ({}),
});
