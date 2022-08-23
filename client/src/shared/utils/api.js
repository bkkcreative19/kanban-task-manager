import axios from "axios";

import { createBrowserHistory } from "history";

import toast from "./toast";
import { objectToQueryString } from "./url";

const defaults = {
  baseURL:
    process.env.NODE_ENV !== "production"
      ? "http://localhost:5001/api"
      : "https://api-kris-taskmanager.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
  error: {
    code: "INTERNAL_ERROR",
    message:
      "Something went wrong. Please check your internet connection or contact our support.",
    status: 503,
    data: {},
  },
};

const api = (method, url, variables) =>
  new Promise((resolve, reject) => {
    axios({
      method,
      baseURL: `${defaults.baseURL}${url}`,

      headers: defaults.headers,
      params: method === "get" ? variables : undefined,
      data: method !== "get" ? variables : undefined,
      paramsSerializer: objectToQueryString,
    }).then(
      (response) => {
        resolve(response.data);
      },
      (error) => {
        if (error.response) {
          reject(error.response.data.error);
        } else {
          reject(defaults.error);
        }
      }
    );
  });

const optimisticUpdate = async (
  url,
  { updatedFields, currentFields, setLocalData }
) => {
  try {
    setLocalData(updatedFields);
    await api("put", url, updatedFields);
  } catch (error) {
    setLocalData(currentFields);
    toast.error(error);
  }
};

export default {
  get: (...args) => api("get", ...args),
  post: (...args) => api("post", ...args),
  put: (...args) => api("put", ...args),
  patch: (...args) => api("patch", ...args),
  delete: (...args) => api("delete", ...args),
  optimisticUpdate,
};
