import axios from "axios";

import igdbConfig from "./igdbConfig";

const axiosConfig = axios.create({
    baseURL: igdbConfig.baseApiUrl,
    headers: {
        'Content-Type': 'text/plain',
        'Client-ID': `${igdbConfig.clientId}`,
        'Authorization': `Bearer ${igdbConfig.accessToken}`,
        "Access-Control-Allow-Origin": "*",
        'Access-Control-Allow-Credentials': true
    }
});

axiosConfig.interceptors.request.use(async (config) => config);

axiosConfig.interceptors.response.use(
    response => {
        if(response && response.data) {
            return response.data;
        }
        return response;
    },
    error => {
        throw error;
    }
);

export default axiosConfig;