import { configureStore } from "@reduxjs/toolkit";

import boardReducer from "./shared/features/board/boardSlice";
import { apiSlice } from "./shared/features/api/apiSlice";

export const store = configureStore({
  reducer: {
    activeBoard: boardReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});
