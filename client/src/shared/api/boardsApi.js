import axios from "axios";

const boardsApi = axios.create({
  baseURL: "http://localhost:5000",
});

export const getBoards = async () => {
  const response = await boardsApi.get("/boards");

  return response.data;
};

export const getBoardWithColumns = async (active) => {
  const response = await boardsApi.get(`boards/${active}`);
  return response.data[0];
};

export const addBoard = async (board) => {
  const response = await boardsApi.post("/boards", board);
  return response.data;
};

export default boardsApi;