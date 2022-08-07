import {
  createSelector,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";

import { apiSlice } from "../api/apiSlice";

const columnsAdapter = createEntityAdapter();

const initialState = columnsAdapter.getInitialState();

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getColumns: builder.query({
      query: (boardId) => `/columns/${boardId}`,
      providesTags: ["Column"],
    }),
    createColumn: builder.mutation({
      query: (column) => ({
        url: `/columns/${column.boardId}`,
        method: "POST",
        body: {
          name: column.name,
        },
      }),
      invalidatesTags: ["Column"],
    }),
    // getBoard: builder.query({
    //   query: (id) => `board/${id}`,
    // }),
  }),
});

export const { useGetColumnsQuery, useCreateColumnMutation } = extendedApiSlice;

export const selectColumnsResult = apiSlice.endpoints.getColumns.select();

export const selectAllColumns = createSelector(
  selectColumnsResult,
  (columnsResult) => columnsResult?.data ?? []
);

export const selectColumnById = createSelector(
  selectAllColumns,
  (state, columnId) => columnId,
  (columns, columnId) => columns.find((column) => column.id === columnId)
);

// export const selectColumnNames = createSelector(
//   selectAllColumns,
//   (state, columns) => columns.map((column) => column.name)
// );
