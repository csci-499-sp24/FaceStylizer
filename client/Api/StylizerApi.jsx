import axios from "axios";

const STYLIZER_CLOUD_RUN_ENDPOINT_URL = "https://stylizer-xry5ww6xvq-uk.a.run.app/";

const StylizerApi = axios.create({
    baseURL: STYLIZER_CLOUD_RUN_ENDPOINT_URL,
    headers: {
        "Content-Type": "application/json"
    }
});

export default StylizerApi;
