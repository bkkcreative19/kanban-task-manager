import {
  createSelector,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";

import { apiSlice } from "../api/apiSlice";
import { boardSlice } from "../board/boardSlice";

import { store } from "../../../store";

const columnsAdapter = createEntityAdapter();

const initialState = columnsAdapter.getInitialState();

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getColumns: builder.query({
      query: (boardId) => `/columns/${boardId}`,
      providesTags: ["Column"],
      transformResponse: (response) => {
        return response.map((column) => column.name);
      },
    }),
    createColumn: builder.mutation({
      query: (column) => ({
        url: `/columns/${column.boardId}`,
        method: "POST",
        body: {
          name: column.name,
        },
      }),
      invalidatesTags: ["Column", "Board"],
    }),
    // getBoard: builder.query({
    //   query: (id) => `board/${id}`,
    // }),
  }),
});

export const { useGetColumnsQuery, useCreateColumnMutation } = extendedApiSlice;

const activeBoard = store.getState().activeBoard;

export const selectColumnsResult = apiSlice.endpoints.getColumns.select(
  activeBoard.active
);

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
