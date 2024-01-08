import axios from "axios";
import { API } from "../utils/config";

export const addToCart = (token, cartItem) => {
    console.log("cartItem: ", cartItem);
    return axios
        .post(`${API}/cart`, cartItem, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        })
        .catch((error) => {
            console.error("Cart POST Error: ", error);
        });
};

export const getCartItems = (token) => {
    return axios.get(`${API}/cart`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

export const updateCartItems = (token, cartItem) => {
    console.log(token);
    return axios.put(`${API}/cart`, cartItem, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
};

export const deleteCartItem = (token, cartItem) => {
    return axios.delete(`${API}/cart/${cartItem._id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

//! Profile
export const getProfile = (token) => {
    return axios.get(`${API}/profile`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

export const updateProfile = (token, data) => {
    return axios.post(`${API}/profile`, data, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
};

//! SSlcommerz Payment
export const initPayment = (token, discount) => {
    return axios.get(`${API}/payment?discount=${discount}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};
//*--------- Original -----------------
// export const initPayment = (token) => {
//     return axios.get(`${API}/payment`, {
//         headers: {
//             Authorization: `Bearer ${token}`,
//         },
//     });
// };

//! Comments
export const postComment = (token, data) => {
    return axios.post(`${API}/comment`, data, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
};

export const getComment = () => {
    return axios.get(`${API}/comment`);
};

//! Orders
export const getOrders = () => {
    return axios.get(`${API}/orders`);
};

//! User Purchase History
export const getUserHistory = (token) => {
    return axios.get(`${API}/user/history`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};
