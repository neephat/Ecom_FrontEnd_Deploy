import React, { useState } from "react";
import Layout from "../Layout";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { userInfo } from "../../utils/auth";
import { createCoupon } from "../../api/apiAdmin";

const CreateCoupon = () => {
  const [values, setValues] = useState({
    name: "",
    code: "",
    amount: 0,
  });

  const { name, code, amount } = values;

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    createCoupon(userInfo().token, values)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));

    setValues({
      ...values,
      name: "",
      code: "",
      amount: 0,
    });
  };

  const couponForm = () => {
    return (
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="">Coupon Name</label>
          <input
            name="name"
            type="text"
            onChange={handleChange}
            value={name}
            required
            className="w-full border rounded border-black p-4"
          />
          <label>Coupon Code</label>
          <input
            name="code"
            type="text"
            onChange={handleChange}
            value={code}
            required
            className="w-full border rounded border-black p-4"
          />
          <label>Amount</label>
          <input
            name="amount"
            type="number"
            onChange={handleChange}
            value={amount}
            required
            className="w-full border rounded border-black p-4"
          />
        </div>
        <button type="submit" className="btn btn-sm btn-info">
          Create Coupon
        </button>
      </form>
    );
  };
  const goBack = () => (
    <div className="mt-5">
      <button className="btn btn-sm btn-accent">
        <Link to="/admin/dashboard" className="">
          Go to Dashboard
        </Link>
      </button>
    </div>
  );
  return (
    <div>
      <Layout title="create coupon">
        <div className="border rounded shadow-lg bg-white p-4 max-w-fit mx-auto">
          {couponForm()}
          {goBack()}
        </div>
      </Layout>
    </div>
  );
};

export default CreateCoupon;
