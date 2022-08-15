import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "https://kris-taskmanager.com/api" }),
  tagTypes: ["Board", "Column", "Task"],
  endpoints: (builder) => ({}),
});
