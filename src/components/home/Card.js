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

    const filterComment = commentCount.filter((c) => c.product === product._id);

    const soldArr = orders.map((p) => {
        let sold = null;
        if (p.productId === product._id) {
            sold = (
                <span>
                    <Typography variant="body1">Sold:{p.count}</Typography>
                </span>
            );
        }
        return sold;
    });

    return (
        <div className="mb-10 border border-1 m-1 rounded-lg">
            <Card sx={{ maxWidth: 340, height: 410, margin: '2px' }}>
                {/* {JSON.stringify(commentCount)} */}
                <img
                    style={{maxHeight: 200}}
                    src={`${API}/product/photo/${product._id}`}
                    alt={product.name}
                    className="w-full bg-contain mx-auto"
                />
                {/* <CardMedia
                    sx={{ imgStyle }}
                    image={`${API}/product/photo/${product._id}`}
                    alt={product.name}
                /> */}
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
                    {/* Show comments */}
                    <div>
                        <Typography variant="body1">
                            Reviews:{filterComment.length}
                        </Typography>
                    </div>
                    <div>{soldArr}</div>
                </CardContent>
                <CardActions>
                    {/* ---- Sending products id as query to the productDetails page --- */}
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
        </div>
    );
};

export default ProductCard;
