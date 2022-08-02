import axios from "axios";

const columnsApi = axios.create({
  baseURL: "http://localhost:5000",
});

export const getColumns = async (boardId) => {
  const response = await columnsApi.get(`/columns/${boardId}`);

  return response.data;
};

// export const getBoardWithColumns = async (active) => {
//   const response = await columnsApi.get(`boards/${active}`);
//   return response.data[0];
// };

export const addColumn2 = async (data) => {
  const response = await columnsApi.post(`/columns/${data.boardId}`, {
    name: data.name,
  });
  return response.data;
};

export const deleteColumn = async (id) => {
  return await columnsApi.delete(`http://localhost:5000/columns/${id}`);
};

// export const getColumns = async () => {
//   const response = await columnsApi.get(`/columns/${data.boardId}`);

//   return response.data;
// };

export default columnsApi;
