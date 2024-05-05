import axios from "axios";

const API_URL = "http://localhost:8080/users/"
  // process.env.NODE_ENV === "production"
  //   ? `http://${process.env.NEXT_PUBLIC_IP}:8080/users/`
  //   : "http://localhost:8080/users/";

const UsersApi = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json"
  }
});

export default UsersApi;
