import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API } from "../../utils/config";
import { getOrders, getComment } from "../../api/apiOrder";
import { userInfo } from "../../utils/auth";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import "./card.css";

const ProductCard = ({ product, handleAddToCart }) => {
  const titleStyle = {
    display: "block",
    textOverflow: "ellipsis",
    wordWrap: "break-word",
    overflow: "hidden",
    maxHeight: "2em",
    lineHeight: "1em",
  };
  const [commentCount, setCommentCount] = useState([]);
  const [orders, setOrders] = useState([]);
  // console.log(commentCount);

  useEffect(() => {
    getOrders()
      .then((res) => setOrders(res.data))
      .catch((err) => console.log(err));

    getComment()
      .then((res) => setCommentCount(res.data))
      .catch((err) => console.log(err));
  }, []);

  const filterComment = commentCount?.filter((c) => c.product === product._id);

  const soldArr = orders?.map((p) => {
    let sold = null;
    if (p.productId === product._id) {
      sold = <p className="font-semibold">Sold:{p.count}</p>;
    }
    return sold;
  });

  return (
    <>
      {/* <div className="mb-10 border border-1 m-1 rounded-lg">
        <Card sx={{ maxWidth: 340, height: 410, margin: "2px" }}>
          {JSON.stringify(commentCount)}
          <img
            style={{ maxHeight: 200 }}
            src={`${API}/product/photo/${product._id}`}
            alt={product.name}
            className="w-full bg-contain mx-auto"
          />
          <CardMedia
                    sx={{ imgStyle }}
                    image={`${API}/product/photo/${product._id}`}
                    alt={product.name}
                />
          <CardContent>
            <div style={{ minHeight: "3em" }}>
              <Typography variant="h5" sx={{ titleStyle }}>
                {product.name}
              </Typography>
            </div>
            <div>
              <Typography variant="body2" color="text.secondary">
                <span>&#2547;</span>
                {product.price}
                {product.quantity ? (
                  <span
                    style={{
                      padding: 5,
                      backgroundColor: "orange",
                      borderRadius: 5,
                      fontWeight: "bold",
                    }}
                  >
                    In Stock
                  </span>
                ) : (
                  <span>Out of Stock</span>
                )}
              </Typography>
            </div>
           
            <div>
              <Typography variant="body1">
                Reviews:{filterComment.length}
              </Typography>
            </div>
            <div>{soldArr}</div>
          </CardContent>
          <CardActions>
           
            <Link to={`/product/${product._id}`}>
              <Button variant="outlined" size="small">
                View Product
              </Button>
            </Link>
            {product.quantity ? (
              <>
                &nbsp;
                <Button
                  variant="outlined"
                  size="small"
                  onClick={handleAddToCart}
                >
                  Add to Cart
                </Button>
              </>
            ) : (
              ""
            )}
          </CardActions>
        </Card>
      </div> */}
      <div className="card bg-base-100 w-auto h-98 shadow-xl mx-4 my-2 border border-slate-100">
        <figure>
          <img
            // style={{maxHeight: 200}}
            src={`${API}/product/photo/${product._id}`}
            alt={product.name}
            className=" max-w-full h-48 object-fill transition-transform duration-300 ease-in-out hover:scale-105"
          />
        </figure>
        <div className="card-body p-4 gap-1 flex flex-wrap justify-center items-center">
          <h2 className="card-title flex flex-row flex-wrap justify-center items-center">
            <p className="text-sm sm:text-xl">{product?.name}</p>
            <span
              className={`badge text-xs sm:text-md ${
                product?.quantity > 0 ? "badge-success" : "badge-danger"
              } badge-outlined text-white`}
            >
              {product?.quantity > 0 ? "In Stock" : "Out of Stock"}
            </span>
          </h2>
          <span className="font-semibold">
            <span className="text-xl">&#2547;</span> {product.price}
          </span>

          <p className="font-semibold">Reviews:{filterComment.length}</p>
          <p>{soldArr}</p>
          <div className="card-actions justify-center sm:justify-end">
            <Link to={`/product/${product._id}`}>
              <button className="btn btn-default btn-outline px-2 rounded-lg h-0 btn-xs sm:btn-sm ">
                View Product
              </button>
            </Link>
            {product.quantity ? (
              <>
                &nbsp;
                <button
                  className="btn btn-default btn-outline px-2 rounded-lg h-0 btn-xs sm:btn-sm "
                  onClick={handleAddToCart}
                >
                  Add to Cart
                </button>
              </>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
