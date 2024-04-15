import axios from "axios";

const FILE_API_URL = "http://localhost:8080/files/";

const FilesApi = axios.create({
  baseURL: FILE_API_URL,
});
const uploadFile = (formData) => {
  return axios.post("/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export default FilesApi;
