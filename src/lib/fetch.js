import axios from 'axios';
import { API_URL } from '@/config/config';
import Cookie from "js-cookie"

// axios.defaults.baseURL = API_URL;

const fetch = axios.create({
    baseURL: API_URL,
    // timeout: 1000
});

if(typeof window !== "undefined"){
    const token = Cookie.get("wtoken");
    fetch.defaults.headers.common = {'Authorization': `Bearer ${token}`};
}

export const addToken = async (token) => {
    fetch.defaults.headers.common = {'Authorization': `Bearer ${token}`};
}

export const removeToken = async () => {
    delete fetch.defaults.headers.common["Authorization"];
}

export default fetch;