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
      invalidatesTags: ["Board"],
    }),
    updateTask: builder.mutation({
      query: (task) => ({
        url: `/tasks/${task.taskId}`,
        method: "PUT",
        body: task,
      }),
      invalidatesTags: ["Board", "Task"],
      // query: (task) => console.log(task),
      // invalidatesTags: ["Task"],
    }),
    deleteTask: builder.mutation({
      query: (title) => ({
        url: `/tasks/${title}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Board"],
    }),
    updateDragTask: builder.mutation({
      query: (task) => ({
        url: `/drag-task/${task.taskId}`,
        method: "PUT",
        body: task,
      }),

      // onQueryStarted()
      async onQueryStarted({ id, ...put }, { dispatch, queryFulfilled }) {
        const putResult = dispatch(
          apiSlice.util.updateQueryData("getBoard", put.boardId, (draft) => {
            draft.tasks.forEach((task) => {
              if (task.id === put.taskId) {
                task.listPosition = put.listPosition;
                task.status = put.status;
              }
            });
          })
        );
        try {
          await queryFulfilled;
        } catch {
          putResult.undo();

          /**
           * Alternatively, on failure you can invalidate the corresponding cache tags
           * to trigger a re-fetch:
           * dispatch(api.util.invalidateTags(['Post']))
           */
        }
      },

      // invalidatesTags: ["Board"],
      // query: (task) => console.log(task),
      // invalidatesTags: ["Task"],
    }),
  }),
});

export const {
  useCreateTaskMutation,
  useGetTaskQuery,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
  useUpdateDragTaskMutation,
} = extendedApiSlice;

export const selectTaskResult = apiSlice.endpoints.getTask.select();

export const selectTask = createSelector(
  selectTaskResult,
  (taskResult) => taskResult?.data ?? {}
);
