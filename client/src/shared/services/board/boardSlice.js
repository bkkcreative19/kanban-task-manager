import {
  createSelector,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";

import { apiSlice } from "../api/apiSlice";

const boardsAdapter = createEntityAdapter();

const initialState = boardsAdapter.getInitialState();

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBoards: builder.query({
      query: () => `/boards`,
      providesTags: ["Boards"],
    }),

    getBoard: builder.query({
      query: (id) => `http://localhost:5001/api/boards/${id}`,
      providesTags: ["Board"],
    }),

    createBoard: builder.mutation({
      query: (board) => ({
        url: "/boards",
        method: "POST",
        body: board,
      }),

      async onQueryStarted({ id, ...patch }, { dispatch, queryFulfilled }) {
        try {
          const { data: createdBoard } = await queryFulfilled;

          const patchResult = dispatch(
            apiSlice.util.updateQueryData("getBoards", id, (draft) => {
              console.log(draft);
              Object.assign(draft, createdBoard);
            })
          );
        } catch {}
      },
    }),

    updateBoard: builder.mutation({
      query: (board) => ({
        url: `/boards/${board.id}`,
        method: "PUT",
        body: { name: board.boardName, columns: board.columns },
      }),
      invalidatesTags: ["Board", "Column"],
    }),
    deleteBoard: builder.mutation({
      query: (id) => ({
        url: `/boards/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Board", "Column"],
    }),
  }),
});

export const boardSlice = createSlice({
  name: "activeBoard",
  initialState: {
    active: Number(localStorage.getItem("active")),
  },
  reducers: {
    setActive(state, action) {
      if (Number(localStorage.getItem("active") !== action.payload)) {
        state.active = action.payload;
      } else {
        state.active = localStorage.getItem("active");
      }
    },
  },
});

export const {
  useGetBoardsQuery,
  useGetBoardQuery,
  useCreateBoardMutation,
  useUpdateBoardMutation,
  useDeleteBoardMutation,
} = extendedApiSlice;

export const selectBoardsResult = apiSlice.endpoints.getBoards.select();

export const selectAllBoards = createSelector(
  selectBoardsResult,
  (boardsResult) => boardsResult?.data ?? []
);

export const selectBoardById = createSelector(
  selectAllBoards,
  (state, boardId) => boardId,
  (boards, boardId) => boards.find((board) => board.id === boardId)
);
export const { setActive } = boardSlice.actions;
export default boardSlice.reducer;
