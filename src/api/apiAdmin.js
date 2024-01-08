import { API } from "../utils/config";
import axios from "axios";

export const createCategory = (token, data) => {
    return axios.post(`${API}/category`, data, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
};

export const createProduct = (token, data) => {
    return axios.post(`${API}/product`, data, {
        headers: {
            // "Content-Type": "application/json",
            "Content-Type":
                "multipart/form-data; boundary=<calculated when request is sent>",
            Authorization: `Bearer ${token}`,
        },
    });
};

export const getCategories = () => {
    return axios.get(`${API}/category`);
};

//todo --> Modifications ----------

export const createCoupon = (token, data) => {
    console.log(data);
    return axios.post(`${API}/coupon`, data, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
};

export const getCoupon = (code) => {
    const data = {
        code: code,
    };

    return axios.post(`${API}/coupon/get`, data, {
        headers: {
            "Content-Type": "application/json",
        },
    });
};
