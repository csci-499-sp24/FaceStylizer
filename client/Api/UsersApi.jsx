import axios from "axios";

const API_URL =
  process.env.NODE_ENV === "production"
    ? "http://18.116.241.33:8080/users/"
    : "http://18.116.241.33:8080/users/";

const UsersApi = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json"
  }
});

export default UsersApi;
