import axios from "axios";

const FILE_API_URL =
    process.env.NODE_ENV === "production"
        ? "http://18.116.241.33:8080/files/"
        : "http://18.116.241.33:8080/files/";

const FilesApi = axios.create({
    baseURL: FILE_API_URL,
    headers: {
        "Content-Type": "application/json"
    }
});

export default FilesApi;