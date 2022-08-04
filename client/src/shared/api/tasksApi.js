import axios from "axios";

const tasksApi = axios.create({
  baseURL: "http://localhost:5000",
});

export const createTask = async (data) => {
  const response = await tasksApi.post("/tasks", data);

  return response.data;
};

export const getTask = async (title) => {
  const response = await tasksApi.get(`/tasks/${title}`);
  return response.data;
};

export const editTask = async (data) => {
  console.log(data);
  return await tasksApi.put(`/tasks/${data.taskId}`, data);
};

// export const getBoardWithColumns = async (active) => {
//   const response = await tasksApi.get(`boards/${active}`);
//   return response.data[0];
// };

// export const addBoard = async (board) => {
//   const response = await tasksApi.post("/boards", board);
//   return response.data;
// };

// export const editBoard = async (data) => {
//   return await tasksApi.put(`/boards/${data.boardId}`, {
//     name: data.boardName,
//     columns: data.columns,
//   });
// };

// export const deleteBoard = async (id) => {
//   return await tasksApi.delete(`http://localhost:5000/boards/${id}`);
// };

export default tasksApi;
