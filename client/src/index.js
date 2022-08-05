import React from "react";
import ReactDOM from "react-dom/client";

import { App } from "./App";
import { BrowserRouter as Router } from "react-router-dom";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
// import { store } from "./store";

import { ApiProvider } from "@reduxjs/toolkit/query/react";
import { apiSlice } from "./shared/features/api/apiSlice";

// const queryClient = new QueryClient({
//   defaultOptions: {
//     queries: {
//       refetchOnWindowFocus: false,
//       refetchOnmount: false,
//       refetchOnReconnect: false,
//       retry: false,
//     },
//   },
// });

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <Provider store={store}>
  //   <QueryClientProvider client={queryClient}>
  //     <Router>
  //       <App />
  //     </Router>
  //     <ReactQueryDevtools initialIsOpen />
  //   </QueryClientProvider>
  // </Provider>
  <ApiProvider api={apiSlice}>
    <Router>
      <App />
    </Router>
  </ApiProvider>
);
