import React, { useState } from "react";
import Layout from "../Layout";
import { showError, showSuccess, showLoading } from "../../utils/messages";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { createCategory } from "../../api/apiAdmin";
import { userInfo } from "../../utils/auth";

const CreateCategory = () => {
    const [values, setValues] = useState({
        name: "",
        error: false,
        success: false,
        loading: false,
    });

    const { name, error, success, loading } = values;

    const handleSubmit = (e) => {
        e.preventDefault();
        setValues({
            ...values,
            loading: true,
            error: false,
            success: false,
        });

        const { token } = userInfo();
        createCategory(token, { name: name })
            .then((res) => {
                setValues({
                    ...values,
                    error: false,
                    success: true,
                    loading: false,
                });
            })
            .catch((err) => {
                if (err.response)
                    setValues({
                        ...values,
                        success: false,
                        error: err.response.data,
                        loading: false,
                    });
                else
                    setValues({
                        ...values,
                        success: false,
                        error: "This category already exits",
                        loading: false,
                    });
            });
    };

    const handleChange = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value,
            error: false,
        });
    };

    const categoryForm = () => {
        return (
            <form onSubmit={handleSubmit}>
                <div className="my-4">
                    <label className="">Name</label>
                    <input
                        name="name"
                        type="text"
                        onChange={handleChange}
                        value={name}
                        autoFocus
                        required
                        className="w-full border p-4"
                    />
                </div>
                <Button type="submit" variant="contained">
                    Create Category
                </Button>
            </form>
        );
    };

    const goBack = () => (
        <div className="mt-5">
            <Button variant="outlined">
                <Link to="/admin/dashboard" className="">
                    Go to Dashboard
                </Link>
            </Button>
        </div>
    );

    return (
        <div>
            <Layout
                title="Add a new category"
                description="Ready to add a new category?"
            >
                <div className="">
                    <div className="">
                        {showLoading(loading)}
                        {showError(error, error)}
                        {showSuccess(success, "Category Created!")}
                        {categoryForm()}
                        {goBack()}
                    </div>
                </div>
            </Layout>
        </div>
    );
};

export default CreateCategory;
