import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import Layout from "../Layout";
import { Button, Typography } from "@mui/material";
import { showError, showLoading } from "../../utils/messages";
import { login } from "../../api/apiAuth";
import { authenticate, isAuthenticated, userInfo } from "../../utils/auth";
import "./login.css";

const Login = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const socialToken = urlParams.get("token");

    const navigate = useNavigate();
    const [values, setValues] = useState({
        email: "",
        password: "",
        error: false,
        loading: false,
        disabled: false,
        redirect: false,
    });
    const { email, password, loading, error, redirect, disabled } = values;

    useEffect(() => {
        if (socialToken && !redirect) {
            authenticate(socialToken, () => {
                setValues({
                    ...values,
                    success: true,
                    disabled: false,
                    loading: false,
                    redirect: true,
                });
            });
        }
    });

    const handleChange = (e) => {
        setValues({
            ...values,
            error: false,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // alert(JSON.stringify(values));
        setValues({
            ...values,
            error: false,
            loading: true,
            disabled: true,
        });
        login({ email, password })
            .then((res) => {
                authenticate(res.data.token, () => {
                    setValues({
                        ...values,
                        email: "",
                        password: "",
                        success: true,
                        disabled: false,
                        loading: false,
                        redirect: true,
                    });
                });
            })
            .catch((err) => {
                let errMsg = "Something went wrong!";
                if (err.response) {
                    errMsg = err.response.data;
                } else {
                    errMsg = "Something went wrong!";
                }
                setValues({
                    ...values,
                    error: errMsg,
                    disabled: false,
                    loading: false,
                });
            });
    };

    const signInForm = () => {
        const form = (
            <form onSubmit={handleSubmit} className="flex flex-col items-center px-6 py-8 mx-auto  lg:py-0 mb-6">
                
                <div className="my-3 p-8 w-full border rounded-lg shadow-xl sm:max-w-md">
                <Typography variant="h4" sx={{ marginBottom: 2, textAlign: 'center' }}>
                SignUp
                </Typography>
                <label >Email</label>
                <input
                    name="email"
                    type="email"
                    className="block w-96 p-2 border my-1"
                    value={email}
                    onChange={handleChange}
                    placeholder="Enter your email here"
                    required
                />

                <label className="">Password</label>
                <input
                    name="password"
                    type="password"
                    className="block w-96 p-2 border my-1"
                    value={password}
                    onChange={handleChange}
                    placeholder="Enter your password here"
                    required
                />

                <button
                    type="submit"
                    className="block p-2 my-2 bg-blue-800 text-white border border-2 rounded-md w-full cursor-pointer p-2 mt-8"
                    disabled={disabled}
                >
                    Login
                </button>
            </div>
            </form>
        );
        return form;
    };

    //* How can I redirect the user to the home page after successful login?
    const showMsg = () => {
        if (redirect) {
            // navigate("/");
            navigate(`/${userInfo().role}/dashboard`);
        }
        //* The purpose of this function is that if the user is logged in he can not go to the login page again.
        // if (isAuthenticated()) {
        //     return <Navigate to="/" replace />;
        // }
    };

    const google = () => {
        window.open("http://localhost:3001/auth/google", "_self");
    };

    const facebook = () => {
        window.open("http://localhost:3001/auth/facebook", "_self");
    };
    const github = () => {
        window.open("http://localhost:3001/auth/github", "_self");
    };

    return (
        <Layout title="Login">
            {showMsg()}
            {showLoading(loading)}
            {showError(error, error)}
            
            {signInForm()}
            {/* <div className="flex space-x-2 justify-center items-center w-full">
                <div
                    onClick={google}
                    className="my-1 border border-gray-400 rounded-md  cursor-pointer w-1/6 flex items-center justify-center p-2"
                >
                    <img
                        src="/google-logo-9822.png"
                        alt="google logo"
                        className="img"
                    />
                    <span className="ml-2" style={{ fontWeight: "bold" }}>
                        Google
                    </span>
                </div>
                <div
                    onClick={facebook}
                    className="my-1 border  border-gray-400 rounded-md  cursor-pointer w-1/6 flex items-center justify-center p-2"
                >
                    <img
                        src="/facebook.png"
                        alt="google logo"
                        className="img"
                    />
                    <span className="ml-2" style={{ fontWeight: "bold" }}>
                        FaceBook
                    </span>
                </div>
                
            </div> */}
        </Layout>
    );
};

export default Login;
