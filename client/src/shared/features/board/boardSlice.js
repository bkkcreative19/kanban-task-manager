import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";

import { apiSlice } from "../api/apiSlice";

const boardsAdapter = createEntityAdapter({
  // sortComparer: (a, b) => b.id - a.id,
});

const initialState = boardsAdapter.getInitialState();

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBoards: builder.query({
      query: () => "/boards",
      transformResponse: (res) => {
        const loadedBoards = res.sort((a, b) => a.id - b.id);

        return boardsAdapter.setAll(initialState, loadedBoards);
      },
      providesTags: (result, error, arg) => [
        { type: "Boards", id: "LIST" },
        ...result.ids.map((id) => ({ type: "Boards", id })),
      ],
    }),
    // createBoard: builder.mutation({
    //   query: (board) => ({
    //     url: "/boards",
    //     method: "POST",
    //     body: board,
    //   }),
    //   invalidatesTags: ["Boards"],
    // }),
  }),
});
