import { configureStore } from "@reduxjs/toolkit";

import boardReducer from "./shared/services/board/boardSlice";
import { apiSlice } from "./shared/services/api/apiSlice";

export const store = configureStore({
  reducer: {
    activeBoard: boardReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});
