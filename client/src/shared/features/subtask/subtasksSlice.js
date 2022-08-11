import {
  createSelector,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";

import { apiSlice } from "../api/apiSlice";

const subtasksAdapter = createEntityAdapter();

const initialState = subtasksAdapter.getInitialState();

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // getBoards: builder.query({
    //   query: () => `/boards`,
    //   providesTags: ["Board"],
    // }),

    deleteSubtask: builder.mutation({
      query: (id) => ({
        url: `/subtasks/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Task", "Column"],
    }),
  }),
});

export const { useDeleteSubtaskMutation } = extendedApiSlice;
