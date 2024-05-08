import axios from "axios";

const STYLIZER_CLOUD_RUN_ENDPOINT_URL = 
    process.env.NODE_ENV === "production"
        ? `http://${process.env.NEXT_PUBLIC_IP}:8090/`
        : "http://localhost:8090/";

const StylizerApi = axios.create({
    baseURL: STYLIZER_CLOUD_RUN_ENDPOINT_URL,
    headers: {
        "Content-Type": "application/json"
    },
    responseType: 'blob'
});

export default StylizerApi;
