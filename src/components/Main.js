import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Container } from "@mui/material";
import Home from "./home/Home";
import Login from "./user/Login";
import Register from "./user/Register";
//-------------------------------------
import PrivateRoute from "./protectedRoutes/PrivateRoute";
import DashBoard from "./user/DashBoard";
import AdminRoute from "./protectedRoutes/AdminRoute";
import AdminDashboard from "./admin/AdminDashboard";
//--------------------------------------------------------
import CreateCategory from "./admin/CreateCategory";
import CreateProduct from "./admin/CreateProduct";
import CreateCoupon from "./admin/CreateCoupon";
//--------------------------------------------------------
import ProductDetails from "./home/ProductDetails";
//--------------------------------------------------------
import Cart from "./order/Cart";
import ShippingAddress from "./order/ShippingAddress";
import Checkout from "./order/Checkout";
//---------------------------------------------
import Payment from "./order/Payment";

const Main = () => {
    return (
        <div className="w-4/5 m-auto">
            {/* <Container> */}
            <Routes>
                <Route path="/" exact Component={Home} />
                <Route path="/login" exact Component={Login} />
                <Route path="/register" exact Component={Register} />
                <Route path="/product/:id" exact Component={ProductDetails} />
                <Route
                    path="/cart"
                    element={
                        <PrivateRoute>
                            <Cart />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/user/dashboard"
                    element={
                        <PrivateRoute>
                            <DashBoard />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/shipping/:discount"
                    element={
                        <PrivateRoute>
                            <ShippingAddress />
                        </PrivateRoute>
                    }
                />

                <Route
                    path="/payment/:discount"
                    element={
                        <PrivateRoute>
                            <Payment />
                        </PrivateRoute>
                    }
                />

                <Route
                    path="/checkout/:discount"
                    element={
                        <PrivateRoute>
                            <Checkout />
                        </PrivateRoute>
                    }
                />

                <Route
                    path="/admin/dashboard"
                    element={
                        <AdminRoute>
                            <AdminDashboard />
                        </AdminRoute>
                    }
                />
                <Route
                    path="/create/category"
                    element={
                        <AdminRoute>
                            <CreateCategory />
                        </AdminRoute>
                    }
                />
                <Route
                    path="/create/product"
                    element={
                        <AdminRoute>
                            <CreateProduct />
                        </AdminRoute>
                    }
                />
                <Route
                    path="/create/coupon"
                    element={
                        <AdminRoute>
                            <CreateCoupon />
                        </AdminRoute>
                    }
                />
            </Routes>
            {/* <Navigate to="/"/> */}
            {/* </Container> */}
        </div>
    );
};

export default Main;
