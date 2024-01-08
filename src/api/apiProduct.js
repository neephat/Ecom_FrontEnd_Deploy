import { API } from "../utils/config";
import axios from "axios";

export const getProducts = (sortBy, order, limit, skip) => {
    return axios.get(
        `${API}/product?sortBy=${sortBy}&order=${order}&limit=${limit}&skip=${skip}`
    );
};

export const getProductDetails = (id) => {
    return axios.get(`${API}/product/${id}`);
};

export const getCategories = () => {
    return axios.get(`${API}/category`);
};

export const getFilteredProducts = (
    skip,
    limit,
    filters = {},
    order,
    sortBy
) => {
    const data = {
        order: order,
        sortBy: sortBy,
        limit: limit,
        skip: skip,
        filters: { ...filters },
    };
    return axios.post(`${API}/product/filter`, data, {
        headers: {
            "Content-Type": "application/json",
        },
    });
};

//todo ==>> Modifications

export const getOrderedProducts = (order, sortBy) => {
    const data = {
        order: order,
        sortBy: sortBy,
    };
    return axios.post(`${API}/product/order`, data, {
        headers: {
            "Content-Type": "application/json",
        },
    });
};

export const getProductsSortedByPrice = (option) => {
    const data = {
        option: option,
    };
    return axios.post(`${API}/product/price`, data, {
        headers: {
            "Content-Type": "application/json",
        },
    });
};

export const getProductsSortedBySold = (option) => {
    const data = {
        option: option,
    };
    return axios.post(`${API}/product/sold`, data, {
        headers: {
            "Content-Type": "application/json",
        },
    });
};

export const getProductsSortedByReviews = (option) => {
    const data = {
        option: option,
    };
    return axios.post(`${API}/product/review`, data, {
        headers: {
            "Content-Type": "application/json",
        },
    });
};

export const getSearchedProduct = (product) => {
    const data = {
        product: product,
    };
    return axios.post(`${API}/product/search`, data, {
        headers: {
            "Content-Type": "application/json",
        },
    });
};
