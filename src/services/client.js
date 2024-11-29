import axios from "axios";
import Cookies from "js-cookie";

const apiClient = axios.create({
    baseURL: 'http://localhost:8080/api',
    headers: {
        'Content-Type': 'application/json'
    }
});

apiClient.interceptors.request.use(config => {
    if (Cookies.get("jwt")){
        config.headers.Authorization = `Bearer ${Cookies.get("jwt")}`;
    }else{
        delete config.headers.Authorization;
    }
    return config;
});

export default apiClient;