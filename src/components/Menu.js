import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import "./Menu.css";
import { signOut, isAuthenticated, userInfo } from "../utils/auth";
import { Typography } from "@mui/material";
import Cart from "./order/Cart";
import navLogo from "../assets/images/ecom_logo.png";
import { ToastContainer } from "react-toastify";
const Menu = () => {
  const navigate = useNavigate();
  const [isSticky, setIsSticky] = useState(false);
  const [toggle, setToggle] = useState(false);

  const modalRef = useRef();
  useEffect(() => {
    // Navbar Scrolling Handler
    const scrollHandler = () => {
      const offset = window.scrollY;
      if (offset > 0) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };
    window.addEventListener("scroll", scrollHandler);

    return () => {
      window.addEventListener("scroll", scrollHandler);
    };
  }, []);
  let navLinks = null;
  if (isAuthenticated()) {
    navLinks = [
      { name: "Home", href: "/" },

      { name: "Dashboard", href: `/${userInfo().role}/dashboard` },
    ];
  } else {
    navLinks = [
      { name: "Home", href: "/" },

      { name: "Register", href: "/register" },
    ];
  }

  const navBar = navLinks.map((link) => {
    const navlinks = (
      // <NavLink
      //   key={link.name}
      //   to={link.href}
      //   className={({ isActive }) => {
      //     return isActive ? "activeBtn" : "btn";
      //   }}
      // >
      //   {link.name}
      // </NavLink>
      <div className="mx-2 font-semibold text-sm md:text-lg text-end ">
        <NavLink
          key={link.name}
          to={link.href}
          className={({ isActive }) => {
            return isActive ? " text-amber-600 font-bold " : "";
          }}
        >
          {link.name}
        </NavLink>
      </div>
    );

    return navlinks;
  });

  let logoutBtn = null;
  if (isAuthenticated()) {
    logoutBtn = (
      <button
        className="btn border-none btn-xs md:btn-md sm:btn-sm shadow-none rounded-full text-white btn-success hover:bg-gray-300 hover:text-black px-4 gap-2 flex items-center"
        onClick={() => {
          signOut(() => {
            localStorage.clear();
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
    <>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick={true}
        rtl={false}
        pauseOnFocusLoss
        draggable={true}
        pauseOnHover={true}
      />
      {/* // <div className="flex pt-4 pb-4 justify-between items-center border border-1 bg-gray-100">
    //   <Typography variant="h4">E-Com</Typography>
    //   <nav className="">{navBar}</nav>
    //   <span>{logoutBtn}</span>
    // </div> */}

      <header className="max-w-screen-2xl container mx-auto bg-white fixed z-50 top-0 left-0 right-0 ">
        <div
          className={`navbar lg:px-12 ${
            isSticky
              ? "shadow-md bg-white transition-all duration-300 ease-in-out"
              : ""
          }`}
        >
          <div className="navbar-center">
            <div className="dropdown">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost lg:hidden"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow rounded-box w-52 bg-white text-center text-md"
              >
                {navBar}
              </ul>
            </div>
            <span onClick={(e) => navigate("/")} className="cursor-pointer">
              <img
                src={navLogo}
                alt="E-COMMERCE"
                className="h-6 w-8 sm:h-8 sm:w-12"
              />
            </span>
          </div>
          <div className="navbar-start hidden lg:flex flex justify-end">
            <ul className="menu menu-horizontal px-1 text-end"> {navBar}</ul>
          </div>
          <div className="navbar-end text-end sm:text-end flex justify-end">
            {/* Cart Items */}
            {/* <NavLink
            to={"/cart-copy"}
            className={({ isActive }) => {
              return isActive ? "" : "";
            }}
          >
            <label
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle mr-3 hidden sm:flex items-center justify-center"
            >
              <div className="indicator">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <span className="badge badge-sm indicator-item">8</span>
              </div>
            </label>
          </NavLink> */}

            <div className="drawer drawer-end ">
              <input
                id="my-drawer-4"
                type="checkbox"
                className="drawer-toggle"
                checked={toggle}
                onClick={(e) => setToggle(!toggle)}
              />
              <div className="drawer-content">
                <label
                  htmlFor="my-drawer-4"
                  className="drawer-button btn btn-ghost btn-circle"
                >
                  <div className="indicator">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                    {/* <span className="badge badge-sm indicator-item">8</span> */}
                  </div>
                </label>
              </div>
              <div className="drawer-side z-50">
                <label
                  htmlFor="my-drawer-4"
                  aria-label="close sidebar"
                  className="drawer-overlay"
                ></label>

                <ul
                  className={`${
                    !toggle ? "hidden" : ""
                  } menu bg-base-200 text-base-content min-h-full max-w-96 p-4`}
                >
                  <button
                    className={`${
                      !toggle ? "drawer-toggle" : ""
                    } absolute right-4`}
                    onClick={(e) => setToggle(!toggle)}
                  >
                    <svg
                      className="w-6 h-6 text-slate-800"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18 17.94 6M18 18 6.06 6"
                      />
                    </svg>
                  </button>
                  {isAuthenticated() && toggle ? (
                    <Cart loadString={true} />
                  ) : (
                    <div className="text-center py-12">
                      <p className="font-semibold text-2xl">
                        Please Sign In First
                      </p>
                    </div>
                  )}
                </ul>
              </div>
            </div>

            {/* Button */}

            {logoutBtn ? (
              <span>{logoutBtn}</span>
            ) : (
              <button
                className="btn border-none btn-xs md:btn-md sm:btn-sm shadow-none rounded-full text-white btn-success hover:bg-gray-300 hover:text-black px-2 sm:px-4 gap-2 flex items-center"
                onClick={(e) => navigate("/login")}
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      </header>

      {/* <dialog
        id="my_modal_5"
        ref={modalRef}
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box">
          <h3 className="font-semibold text-lg border-b border-gray-500">
            Admin Login Info Modal!
          </h3>
          <p className="font-semibold py-4 text-center">
            Admin mail: neephat.benazir@gmail.com <br />
            Admin Password: 12345678 <br />
            Coupon Code: 12345670 for 70% <br />
            123450 for 50% <br />
            1230 for 30%
          </p>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn btn-error text-white">Close</button>
            </form>
          </div>
        </div>
      </dialog> */}
    </>
  );
};

export default Menu;
