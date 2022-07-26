import axios from "axios";

const columnsApi = axios.create({
  baseURL: "http://localhost:5000",
});

// export const getBoards = async () => {
//   const response = await columnsApi.get("/boards");

//   return response.data;
// };

// export const getBoardWithColumns = async (active) => {
//   const response = await columnsApi.get(`boards/${active}`);
//   return response.data[0];
// };

export const addColumn = async (data) => {
  const response = await columnsApi.post(`/columns/${data.boardId}`, {
    name: data.name,
  });
  return response.data;
};

export default columnsApi;
