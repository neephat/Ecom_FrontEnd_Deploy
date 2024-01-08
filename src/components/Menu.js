import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import "./Menu.css";
import { signOut, isAuthenticated, userInfo } from "../utils/auth";
import { Typography } from "@mui/material";

const Menu = () => {
    const navigate = useNavigate();

    let navLinks = null;
    if (isAuthenticated()) {
        navLinks = [
            { name: "Home", href: "/" },
            { name: "Cart", href: "/cart" },
            { name: "Dashboard", href: `/${userInfo().role}/dashboard` },
        ];
    } else {
        navLinks = [
            { name: "Home", href: "/" },
            { name: "Login", href: "/login" },
            { name: "Register", href: "/register" },
        ];
    }

    const navBar = navLinks.map((link) => {
        const navlinks = (
            <NavLink
                key={link.name}
                to={link.href}
                className={({ isActive }) => {
                    return isActive ? "activeBtn" : "btn";
                }}
            >
                {link.name}
            </NavLink>
        );

        return navlinks;
    });

    let logoutBtn = null;
    if (isAuthenticated()) {
        logoutBtn = (
            <button
                className="btn cursor-pointer"
                onClick={() => {
                    signOut(() => {
                        navigate("/login");
                    });
                }}
            >
                Logout
            </button>
        );
    } else {
        logoutBtn = null;
    }

    return (
        <div className="flex pt-4 pb-4 justify-between items-center">
            <Typography variant="h4">E-Com</Typography>
            <nav className="">{navBar}</nav>
            <span>{logoutBtn}</span>
        </div>
    );
};

export default Menu;
