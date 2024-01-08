import React, { useState, useEffect } from "react";
import Layout from "../Layout";
import { Link } from "react-router-dom";
import { showError, showSuccess, showLoading } from "../../utils/messages";
import { createProduct, getCategories } from "../../api/apiAdmin";
import { userInfo } from "../../utils/auth";
import { Button } from "@mui/material";

const CreateProduct = () => {
    const [values, setValues] = useState({
        name: "",
        description: "",
        price: "",
        categories: [],
        category: "",
        quantity: "",
        loading: false,
        error: false,
        success: false,
        disabled: false,
        formData: "",
    });

    const {
        name,
        description,
        price,
        categories,
        category,
        quantity,
        loading,
        error,
        success,
        formData,
        disabled,
    } = values;

    useEffect(() => {
        getCategories()
            .then((res) => {
                setValues({
                    ...values,
                    categories: res.data,
                    formData: new FormData(),
                });
            })
            .catch((error) => {
                setValues({
                    ...values,
                    error: "Failed to load categories",
                    formData: new FormData(),
                });
            });
    }, []);

    const handleChange = (e) => {
        const value =
        //! ????? 
            e.target.name === "photo" ? e.target.files[0] : e.target.value;
        formData.set(e.target.name, value);
        setValues({
            ...values,
            [e.target.name]: value,
            error: false,
            success: false,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setValues({
            ...values,
            error: false,
            loading: true,
            disabled: true,
            success: false,
        });
        const { token } = userInfo();
        createProduct(token, formData)
            .then((res) => {
                setValues({
                    ...values,
                    name: "",
                    description: "",
                    price: "",
                    category: "",
                    quantity: "",
                    loading: false,
                    disabled: false,
                    success: true,
                    error: false,
                });
            })
            .catch((error) => {
                let errMsg = "Something went wrong!";
                if (error.response) errMsg = error.response.data;
                setValues({
                    ...values,
                    error: errMsg,
                    loading: false,
                    success: false,
                    disabled: false,
                });
            });
    };

    const productForm = () => (
        <form className="" onSubmit={handleSubmit}>
            <h4>Photo:</h4>
            <div className="">
                <label className=""> </label>
                <input
                    type="file"
                    name="photo"
                    onChange={handleChange}
                    accept="image/*"
                    required
                />
            </div>
            <div className="">
                <label className="">Name:</label>
                <input
                    name="name"
                    onChange={handleChange}
                    type="text"
                    className="w-full border p-4"
                    value={name}
                    required
                />
            </div>
            <div className="">
                <label className="text-muted">Description:</label>
                <textarea
                    name="description"
                    onChange={handleChange}
                    className="w-full border p-4"
                    value={description}
                    required
                />
            </div>
            <div className="">
                <label className="text-muted">Price:</label>
                <input
                    name="price"
                    onChange={handleChange}
                    className="w-full border p-4"
                    type="number"
                    value={price}
                    required
                />
            </div>
            <div className="">
                <label className="text-muted">Quantity:</label>
                <input
                    name="quantity"
                    onChange={handleChange}
                    className="w-full border p-4"
                    type="number"
                    value={quantity}
                    required
                />
            </div>
            <div className="mb-4">
                <label className="text-muted">Category:</label>
                <select
                    name="category"
                    value={category}
                    onChange={handleChange}
                    className="w-full border p-4"
                    required
                >
                    <option value="">----Select Category----</option>
                    {categories &&
                        categories.map((i) => (
                            <option value={i._id} key={i._id}>
                                {i.name}
                            </option>
                        ))}
                </select>
            </div>
            <Button variant="contained" type="submit" disabled={disabled}>
                Create Product
            </Button>
        </form>
    );

    const goBack = () => (
        <div className="">
            <Link to="/admin/dashboard" className="w-full border">
                Go to Dashboard
            </Link>
        </div>
    );

    return (
        <div>
            <Layout title="Add a new product">
                <div className="">
                    <div className="col-md-8 offset-md-2">
                        {showError(error, error)}
                        {showLoading(loading)}
                        {showSuccess(success, "Product Added Successfully!")}
                        {productForm()}
                        {goBack()}
                    </div>
                </div>
            </Layout>
        </div>
    );
};

export default CreateProduct;
