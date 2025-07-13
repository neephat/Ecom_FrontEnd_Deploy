import Layout from "../Layout";
import { Link } from "react-router-dom";
import { userInfo } from "../../utils/auth";
import { getUserHistory } from "../../api/apiOrder";
import React, { useEffect, useState } from "react";
import { Button, Card, CardContent, Typography } from "@mui/material";

const DashBoard = () => {
  const [history, setHistory] = useState([]);
  const { name, email, role } = userInfo();

  useEffect(() => {
    getUserHistory(userInfo().token)
      .then((res) => {
        const groupedHistory = res.data.reduce((acc, order) => {
          if (!acc[order.transaction_id]) {
            acc[order.transaction_id] = {
              _id: order._id,
              transaction_id: order.transaction_id,
              status: order.status,
              sessionKey: order.sessionKey,
              address: order.address,
              paymentStatus: order.paymentStatus,
              discount: order.discount,
              items: [],
            };
          }
          acc[order.transaction_id].items.push(...order.cartItems);
          return acc;
        }, {});

        const groupedHistoryArray = Object.values(groupedHistory);

        setHistory(groupedHistoryArray);
      })
      .catch((err) => console.log(err));
  }, []);
  // useEffect(() => {
  //   console.log("HIST::: ", history);
  // }, [history]);
  const UserLinks = () => {
    return (
      <div>
        <Card>
          <CardContent>
            <Typography variant="h5" color="text.secondary">
              User Links
            </Typography>
            <ul>
              <li>
                <Link to="#">
                  <Button variant="text">Update Profile</Button>
                </Link>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    );
  };

  const formatDateTime = (dateTimeString) => {
    const options = {
      // weekday: "short",
      weekday: "long",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateTimeString).toLocaleDateString("en-US", options);
  };

  const PurchaseHistory = () => {
    return (
      <div className="w-full ">
        <Card>
          <CardContent>
            <p className="font-bold text-2xl sm:3xl text-cyan-500 mb-2">
              Purchase History
            </p>
            <div className="overflow-x-auto">
              <table className="border border-black w-full text-center">
                <thead className="border border-black">
                  <tr className="border border-black text-sm sm:text-lg">
                    <th className="border border-black">#</th>
                    <th className="border border-black">Transaction ID</th>
                    <th className="border border-black">Status</th>
                    <th className="border border-black">Payment status</th>
                    <th className="border border-black">Product</th>
                    <th className="border border-black">Price</th>
                    <th className="border border-black">Quantity</th>
                    <th className="border border-black">Purchase Date</th>
                  </tr>
                </thead>

                <tbody>
                  {history.map((order, index) => (
                    <tr
                      key={order.transaction_id}
                      className="border border-black"
                    >
                      <td className="border border-black">{index + 1}</td>
                      <td className="border border-black">
                        {order.transaction_id}
                      </td>
                      <td className="border border-black">{order.status}</td>
                      <td className="border border-black">
                        {order.paymentStatus}
                      </td>
                      <td className="border border-black">
                        {order.items.map((item) => (
                          <div key={item._id}>{item.productName}</div>
                        ))}
                      </td>
                      <td className="border border-black">
                        {order.items.map((item) => (
                          <div key={item._id}>
                            {Number(item?.price) -
                              (Number(item?.price) *
                                Number(order?.discount ? order.discount : 0)) /
                                100}
                          </div>
                        ))}
                      </td>
                      <td className="border border-black">
                        {order.items.map((item) => (
                          <div key={item._id}>{item.count}</div>
                        ))}
                      </td>
                      <td className="border border-black">
                        {order.items.map((item) => (
                          <div key={item._id}>
                            {formatDateTime(item.createdAt)}
                          </div>
                        ))}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  const UserInfo = () => {
    return (
      <div className="text-center font-semibold">
        <Card>
          <CardContent>
            <p className="font-bold text-2xl sm:3xl text-cyan-500">
              User Information
            </p>
            <ul>
              <li>
                <span className="font-bold">Name: </span>
                {name}
              </li>
              <li>
                <span className="font-bold">Email ID: </span>
                {email}
              </li>
              <li>
                <span className="font-bold">User Roll: </span>
                {role}
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    );
  };

  return (
    <Layout title="Dashboard">
      <div className="gap-4">
        <div className="flex justify-center px-2">
          {/* <div className="basis-2/4">
            <UserLinks />
          </div> */}
          <div className="basis-2/4">
            <UserInfo />
          </div>
        </div>
        <div className="mt-4">
          <PurchaseHistory />
        </div>
      </div>
    </Layout>
  );
};

export default DashBoard;
