import {
  createSelector,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";

import { apiSlice } from "../api/apiSlice";

const tasksAdapter = createEntityAdapter();

const initialState = tasksAdapter.getInitialState();

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // getBoards: builder.query({
    //   query: () => `/boards`,
    //   providesTags: ["Board"],
    // }),
    // getBoard: builder.query({
    //   query: (id) => `board/${id}`,
    // }),
    createTask: builder.mutation({
      query: (task) => ({
        url: "/tasks",
        method: "POST",
        body: task,
      }),
      invalidatesTags: ["Column"],
    }),
    // updateBoard: builder.mutation({
    //   query: (board) => ({
    //     url: `/boards/${board.id}`,
    //     method: "PUT",
    //     body: { name: board.boardName, columns: board.columns },
    //   }),
    //   invalidatesTags: ["Board"],
    // }),
    // deleteBoard: builder.mutation({
    //   query: (id) => ({
    //     url: `/boards/${id}`,
    //     method: "DELETE",
    //   }),
    //   invalidatesTags: ["Board"],
    // }),
  }),
});

export const { useCreateTaskMutation } = extendedApiSlice;
