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
    getTask: builder.query({
      query: (title) => `tasks/${title}`,
      invalidatesTags: ["Task"],
    }),
    createTask: builder.mutation({
      query: (task) => ({
        url: "/tasks",
        method: "POST",
        body: task,
      }),
      invalidatesTags: ["Column"],
    }),
    updateTask: builder.mutation({
      query: (task) => ({
        url: `/tasks/${task.taskId}`,
        method: "PUT",
        body: task,
      }),
      invalidatesTags: ["Column", "Task"],
      // query: (task) => console.log(task),
      // invalidatesTags: ["Task"],
    }),
    // deleteBoard: builder.mutation({
    //   query: (id) => ({
    //     url: `/boards/${id}`,
    //     method: "DELETE",
    //   }),
    //   invalidatesTags: ["Board"],
    // }),
  }),
});

export const { useCreateTaskMutation, useGetTaskQuery, useUpdateTaskMutation } =
  extendedApiSlice;
