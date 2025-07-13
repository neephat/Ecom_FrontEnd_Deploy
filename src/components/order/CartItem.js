import React, { useEffect, useState } from "react";
import { API } from "../../utils/config";
import { Button } from "@mui/material";

const CartItem = ({
  item,
  serial,
  increaseItem,
  decreaseItem,
  removeItem,
  discount,
}) => {
  // const getTotal = () => {
  //   let total = 0;
  //   if (discount === 0) {
  //     total = item.price * item.count;
  //   }
  //   if (discount !== 0) {
  //     total =
  //       item.price * item.count - (item.price * item.count * discount) / 100;
  //   }
  //   return total;
  // };
  const [totalAmount, setTotalAmount] = useState(0);
  useEffect(() => {
    let total = 0;
    if (discount === 0) {
      total = item.price * item.count;
    }
    if (discount !== 0) {
      total =
        item.price * item.count - (item.price * item.count * discount) / 100;
    }
    setTotalAmount(total);
  }, []);
  return (
    <tr className="border max-w-full flex items-center">
      <th>
        <img
          //* We Populated when we created each cartItem.
          src={`${API}/product/photo/${item.product._id}`}
          alt={item.product.name}
          className="max-w-full h-20 object-fill"
        />
      </th>
      <td className="border text-xs sm:text-md">
        {item.product ? item.product.name : ""}
      </td>
      <td className="border">
        <div className="flex flex-col sm:flex-row px-2">
          <button
            className="btn btn-outline btn-primary btn-xs"
            onClick={decreaseItem}
          >
            -
          </button>
          &nbsp;&nbsp;{item.count}&nbsp;&nbsp;
          <button
            className="btn btn-outline btn-primary btn-xs"
            onClick={increaseItem}
          >
            +
          </button>
        </div>
        {/* <button onClick={increaseItem}>+</button> */}
      </td>
      {/* <td className="border">৳ {item.price * item.count}</td> */}
      <td className="border">৳ {totalAmount}</td>
      <td className="border">
        {/* <button className="btn btn-error" onClick={removeItem}>
          Remove From Cart
        </button> */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6 text-rose-500 size-[1rem] cursor-pointer"
          onClick={removeItem}
        >
          <path
            fill-rule="evenodd"
            d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
            clip-rule="evenodd"
          />
        </svg>
      </td>
    </tr>
  );
};

export default CartItem;
