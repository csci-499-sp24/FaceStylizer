import axios from "axios";

const FILE_API_URL = "http://localhost:8080/files/"
    // process.env.NODE_ENV === "production"
    //     ? `http://${process.env.NEXT_PUBLIC_IP}:8080/files/`
    //     : "http://localhost:8080/files/";

const FilesApi = axios.create({
    baseURL: FILE_API_URL,
    headers: {
        "Content-Type": "application/json"
    }
});

export default FilesApi;