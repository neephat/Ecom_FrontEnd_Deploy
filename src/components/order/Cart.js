import { useState, useEffect } from "react";
import Layout from "../Layout";
import { Link, useNavigate } from "react-router-dom";
import {
  getCartItems,
  updateCartItems,
  deleteCartItem,
} from "../../api/apiOrder";
import { userInfo } from "../../utils/auth";
import CartItem from "./CartItem";
import { Button, Typography } from "@mui/material";
import { getCoupon } from "../../api/apiAdmin";
import { toast, ToastContainer } from "react-toastify";

const Cart = (props) => {
  const [cartItems, setCartItems] = useState([]);
  const [code, setCode] = useState("");
  const [coupon, setCoupon] = useState([]);
  const [discount, setDiscount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [err, setError] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    if (cartItems?.length > 0 && !totalAmount) {
      let arr = [];
      if (discount === 0) {
        arr = cartItems.map((item) => item.price * item.count);
      } else {
        arr = cartItems.map(
          (item) =>
            item.price * item.count - (item.price * item.count * discount) / 100
        );
      }

      const sum = arr.reduce((a, b) => a + b, 0);

      setTotalAmount(sum);
    }
  }, [cartItems]);

  const loadCart = () => {
    getCartItems(userInfo().token)
      .then((response) => {
        setCartItems(response.data);
        localStorage.setItem(
          "cartTotal",
          JSON.stringify(response?.data.length)
        );
      })
      .catch((err) => console.log(err.response));
  };
  useEffect(() => {
    if (props.loadString) {
      console.log("PROPPED::: ", props);

      loadCart();
    }
  }, [props]);
  useEffect(() => {
    loadCart();
    //! Discount
    coupon.forEach((d) => {
      setDiscount(d.amount);
    });
  }, [coupon]);

  //! Increase item
  const increaseItem = (item) => () => {
    if (item.count === 5) return;
    const cartItem = {
      ...item,
      count: item.count + 1,
    };

    updateCartItems(userInfo().token, cartItem)
      .then((response) => loadCart())
      .catch((error) => console.log(error.response));
  };

  //! Decrease item
  const decreaseItem = (item) => () => {
    if (item.count === 1) return;
    const cartItem = {
      ...item,
      count: item.count - 1,
    };

    updateCartItems(userInfo().token, cartItem)
      .then((response) => loadCart())
      .catch((error) => console.log(error.response));
  };

  //! Get Total
  //* -------- original ---------
  // const getCartTotal = () => {
  //     const arr = cartItems.map((item) => item.price * item.count);
  //     const sum = arr.reduce((a, b) => a + b, 0);
  //     return sum;
  // };
  // * --------------- Modified ----------
  const getCartTotal = () => {
    let arr = [];
    if (discount === 0) {
      arr = cartItems.map((item) => item.price * item.count);
    } else {
      arr = cartItems.map(
        (item) =>
          item.price * item.count - (item.price * item.count * discount) / 100
      );
    }

    const sum = arr.reduce((a, b) => a + b, 0);

    return sum;
  };

  //! Remove item
  const removeItem = (item) => () => {
    if (!window.confirm("Delete Item?")) return;
    deleteCartItem(userInfo().token, item)
      .then((response) => {
        loadCart();
      })
      .catch((err) => console.log(err.message));
  };

  //! Coupon
  const handleChange = (e) => {
    setCode(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    getCoupon(code)
      .then((res) => setCoupon(res.data))
      .catch((err) => console.log(err));

    setCode("");
  };
  const navigateToCheckout = () => {
    if (cartItems?.length > 0) {
      navigate(`/shipping/${discount}`);
    } else {
      toast.warn("Please add items to checkout");
    }
  };
  return (
    <>
      {/* <nav aria-label="breadcrumb" className="text-sm mb-4">
        <ol className="flex space-x-2">
          <li>
            <a href="#" className="text-blue-600 hover:underline">
              Order
            </a>
          </li>
          <li className="text-gray-500">/ Cart</li>
        </ol>
      </nav> */}
      <div className="my-12">
        {cartItems.map((item, idx) => (
          <CartItem
            key={item._id}
            item={item}
            serial={idx + 1}
            increaseItem={increaseItem(item)}
            decreaseItem={decreaseItem(item)}
            removeItem={removeItem(item)}
            discount={discount}
          />
        ))}
      </div>
      <div className="my-4 text-center">
        <div>
          <div className="border border-black rounded-t-sm flex flex-col sm:flex-row justify-evenly p-1">
            <div className="flex justify-evenly">
              <p className="font-semibold ">Total: </p>
              <p className="font-semiboldcenter px-2">৳{totalAmount}</p>
            </div>
            <div className="flex justify-evenly">
              <p className="font-semibold ">Net Bill: </p>
              <p className="font-semiboldcenter px-2">৳{getCartTotal()}</p>
            </div>
            <p className="font-semibold flex flex-col my-1 sm:my-0 sm:flex-row justify-center">
              {coupon.length !== 0 ? (
                <div className="flex justify-evenly">
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-5 h-5 text-rose-500  cursor-pointer"
                      onClick={(e) => {
                        setDiscount(0);
                        setCoupon([]);
                      }}
                    >
                      <path
                        fill-rule="evenodd"
                        d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </span>
                </div>
              ) : null}
            </p>
          </div>

          <div className="border border-black rounded-b-sm border-t-0 flex flex-col sm:flex-row">
            {/* <td colSpan={2} className="border">
              <Typography variant="body1">Use a coupon</Typography>
            </td> */}

            <div className="">
              <form
                onSubmit={handleSubmit}
                className="w-full justify-center flex flex-col sm:flex-row p-2"
              >
                <div>
                  <input
                    type="text"
                    placeholder="coupon code"
                    onChange={handleChange}
                    value={code}
                    required
                    className="border border-black w-full rounded-md max p-2"
                  />
                </div>
                <div>
                  <button
                    type="submit"
                    variant="contained"
                    // size="small"
                    color="info"
                    className="btn btn-info btn-sm px-4 sm:px-2 m-1"
                  >
                    Check
                  </button>
                </div>
              </form>
            </div>
            <div className="border border-t-black sm:border-t-0 sm:border-l-black">
              <div className="flex p-1">
                {coupon?.length > 0 ? (
                  <>
                    {coupon.map((c) => (
                      <Typography variant="2">{c.name}</Typography>
                    ))}
                    <p className="mx-1 ">Applied</p>
                  </>
                ) : (
                  <p className="mx-1 ">Coupon Name</p>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="gap-2">
          {/* <Link to="/">
            <button className="btn btn-info btn-sm sm:btn-md p-2 m-1">
              Continue Shopping
            </button>
          </Link> */}
          {/* <Link to={`/shipping/${discount}`}> */}
          <button
            className="btn btn-success text-white btn-sm sm:btn-md p-2 m-1"
            color="success"
            onClick={navigateToCheckout}
          >
            Proceed To Checkout
          </button>
          {/* </Link> */}
        </div>
      </div>
      {/* <div>
        <tr className="border">
          <th className="border" scope="row" />
          <td className="border" colSpan={2}>
            Total
          </td>
          <td>
            ৳{getCartTotal()}
            {coupon.length !== 0 ? (
              <span
                className="ml-2"
                style={{
                  color: "red",
                  fontWeight: "bold",
                }}
              >
                Discounted
              </span>
            ) : null}
          </td>
          <td />
        </tr>

        <tr className="border">
          <td colSpan={2} className="border">
            <Typography variant="body1">Use a coupon</Typography>
          </td>
          <td colSpan={2}>
            <form
              onSubmit={handleSubmit}
              className="w-full justify-between flex p-2"
            >
              <input
                type="text"
                placeholder="coupon code"
                onChange={handleChange}
                required
                className="border border-black w-3/4 p-2"
              />
              <Button
                type="submit"
                variant="contained"
                // size="small"
                color="info"
              >
                Check
              </Button>
            </form>
          </td>
          <td colSpan={2} className="border">
            <div className="flex">
              <p className="mr-2">Coupon name: </p>
              {coupon &&
                coupon.map((c) => (
                  <Typography variant="2">{c.name}</Typography>
                ))}
            </div>
          </td>
        </tr>

        <tr>
          <th scope="row" />
          <td colSpan={6} className="p-4">
            <Link to="/" className="mr-4">
              <Button variant="contained">Continue Shopping</Button>
            </Link>
            <Link to={`/shipping/${discount}`}>
              <Button variant="contained" color="success">
                Proceed To Checkout
              </Button>
            </Link>
          </td>
        </tr>
      </div> */}

      {/* <nav aria-label="breadcrumb">
        <ol>
          <li>
            <a href="#">Order</a>
          </li>
          <li>Cart</li>
        </ol>
      </nav>
      <div className="w-full">
        <table className="border w-full text-center">
          <thead className="border">
            <tr className="border">
              <th scope="col" width="15%">
                #
              </th>
              <th className="border">Image</th>
              <th className="border">Product Name</th>
              <th className="border">Quantity</th>
              <th className="border">Price</th>
              <th scop="col">Remove</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item, idx) => (
              <CartItem
                key={item._id}
                item={item}
                serial={idx + 1}
                increaseItem={increaseItem(item)}
                decreaseItem={decreaseItem(item)}
                removeItem={removeItem(item)}
                discount={discount}
              />
            ))}
            <tr className="border">
              <th className="border" scope="row" />
              <td className="border" colSpan={2}>
                Total
              </td>
              <td>
                ৳{getCartTotal()}
                {coupon.length !== 0 ? (
                  <span
                    className="ml-2"
                    style={{
                      color: "red",
                      fontWeight: "bold",
                    }}
                  >
                    Discounted
                  </span>
                ) : null}
              </td>
              <td />
            </tr>
           
            <tr className="border">
              <td colSpan={2} className="border">
                <Typography variant="body1">Use a coupon</Typography>
              </td>
              <td colSpan={2}>
                <form
                  onSubmit={handleSubmit}
                  className="w-full justify-between flex p-2"
                >
                  <input
                    type="text"
                    placeholder="coupon code"
                    onChange={handleChange}
                    required
                    className="border border-black w-3/4 p-2"
                  />
                  <Button
                    type="submit"
                    variant="contained"
                    // size="small"
                    color="info"
                  >
                    Check
                  </Button>
                </form>
              </td>
              <td colSpan={2} className="border">
                <div className="flex">
                  <p className="mr-2">Coupon name: </p>
                  {coupon &&
                    coupon.map((c) => (
                      <Typography variant="2">{c.name}</Typography>
                    ))}
                </div>
              </td>
            </tr>
           
            <tr>
              <th scope="row" />
              <td colSpan={6} className="p-4">
                <Link to="/" className="mr-4">
                  <Button variant="contained">Continue Shopping</Button>
                </Link>
                <Link to={`/shipping/${discount}`}>
                  <Button variant="contained" color="success">
                    Proceed To Checkout
                  </Button>
                </Link>
              </td>
            </tr>
          </tbody>
        </table>
      </div> */}
    </>
  );
};

export default Cart;
