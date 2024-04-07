import axios from "axios";

const STYLIZER_CLOUD_RUN_ENDPOINT_URL = 
    process.env.NODE_ENV === "production"
        ? `${process.env.NEXT_PUBLIC_STYLIZER_URL}`
        : "http://localhost:8080/";

const StylizerApi = axios.create({
    baseURL: STYLIZER_CLOUD_RUN_ENDPOINT_URL,
    headers: {
        "Content-Type": "application/json"
    },
    responseType: 'blob'

});

export default StylizerApi;
