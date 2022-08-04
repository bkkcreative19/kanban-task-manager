import axios from "axios";

const subtasksApi = axios.create({
  baseURL: "http://localhost:5000",
});

// export const createTask = async (data) => {
//   const response = await tasksApi.post("/tasks", data);

//   return response.data;
// };

// export const getTask = async (title) => {
//   const response = await tasksApi.get(`/tasks/${title}`);
//   return response.data;
// };

// export const editTask = async (data) => {
//   return await tasksApi.put(`/tasks/${data.taskId}`);
// };
export const deleteSubtask = async (id) => {
  return await subtasksApi.delete(`/subtasks/${id}`);
};
