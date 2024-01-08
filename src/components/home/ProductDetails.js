import { useEffect, useState } from "react";
import Layout from "../Layout";
import { API } from "../../utils/config";
import { Link, useParams } from "react-router-dom";
import { showSuccess, showError } from "../../utils/messages";
import { Breadcrumbs, Button, Card, Typography } from "@mui/material";
import { getProductDetails } from "../../api/apiProduct";
import { addToCart, postComment, getComment } from "../../api/apiOrder";
import { isAuthenticated, userInfo } from "../../utils/auth";

const ProductDetails = (props) => {
    const { id } = useParams();
    const [product, setProduct] = useState({});
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [comment, setComment] = useState("");
    const [userComments, setUserComment] = useState([]);

    useEffect(() => {
        //!!! wrong -->> const id = props.match.params.id; !!!!!
        getProductDetails(id)
            .then((response) => setProduct(response.data))
            .catch((err) => setError("Failed to load products"));

        getComment()
            .then((res) => setUserComment(res.data))
            .catch((err) => console.log(err));
    }, []);

    const handleAddToCart = (product) => () => {
        if (isAuthenticated()) {
            setError(false);
            setSuccess(false);
            const user = userInfo();
            const cartItem = {
                user: user._id,
                product: product._id,
                price: product.price,
            };
            addToCart(user.token, cartItem)
                .then((reponse) => setSuccess(true))
                .catch((err) => {
                    //! ?????--------problem-------?????????
                    console.log(err.response);
                    if (err.response) setError(err.response.data);
                    else setError("Adding to cart failed!");
                });
        } else {
            setSuccess(false);
            setError("Please Login First!");
        }
    };

    const handleComment = (e) => {
        setComment(e.target.value);
    };


    const handleSubmit = (e) => {

        
        if(isAuthenticated()){
            
            let data = {
                comment: comment,
                product: id,
            };
    
            postComment(userInfo().token, data)
                .then((res) => console.log(res.data))
                .catch((err) => console.log(err));
    
            getComment()
                .then((res) => setUserComment(res.data))
                .catch((err) => console.log(err));
    
            setComment("");
        }else {
            setSuccess(false);
            setError("Please Login First!");
        }
        
    };

    return (
        <Layout title="Product Page">
            <Breadcrumbs aria-label="breadcrumb">
                <Link to="/" underline="hover" color="inherit">
                    Home
                </Link>
                <Link to="#" underline="hover" color="inherit">
                    Product
                </Link>
                <Typography color="text.primary">
                    Home Page Navigation
                </Typography>
            </Breadcrumbs>
            <div>
                {showSuccess(success, "Item Added to Cart!")}
                {showError(error, error)}
            </div>
            <div className="flex p-5">
                <div className="basis-2/4">
                    <img
                        src={`${API}/product/photo/${product._id}`}
                        alt={product.name}
                        width="100%"
                    />
                </div>
                <div className="px-5 basis-2/4">
                    <div className="flex items-center justify-between">
                        <div className="flex">
                            <div>
                                <Typography variant="h5">
                                    {product.name}
                                </Typography>
                                <Typography variant="body1">
                                    &#2547;{product.price}
                                </Typography>
                            </div>
                            <div>
                                <p className=" ml-4">
                                    {product.quantity ? (
                                        <span
                                            style={{
                                                padding: 5,
                                                backgroundColor: "green",
                                                borderRadius: 5,
                                                color: "white",
                                            }}
                                        >
                                            In Stock
                                        </span>
                                    ) : (
                                        <span
                                            style={{
                                                padding: 5,
                                                backgroundColor: "red",
                                                borderRadius: 5,
                                            }}
                                        >
                                            Out of Stock
                                        </span>
                                    )}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center">
                            {product.quantity ? (
                                <>
                                    <Button
                                        sx={{ marginTop: 3 }}
                                        variant="contained"
                                        onClick={handleAddToCart(product)}
                                    >
                                        Add to Cart
                                    </Button>
                                </>
                            ) : (
                                ""
                            )}
                        </div>
                    </div>

                    {/* ------------- Comments ------------ */}
                    <div className="my-4">
                        <Typography variant="h5">Give your feedback</Typography>
                        <form onSubmit={handleSubmit}>
                            <input
                                className="w-full border border-2 p-3 my-4"
                                type="text"
                                placeholder="comment"
                                onChange={handleComment}
                                required
                            ></input>
                            <Button variant="contained" type="submit">
                                Post
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
            <div>
                <Typography variant="h4">Comments:</Typography>
                {userComments &&
                    userComments
                        .filter((c) => c.product === id)
                        .map((c) => (
                            <Card
                                sx={{
                                    marginTop: 2,
                                    marginBottom: 2,
                                    padding: 2,
                                }}
                                key={c.id}
                            >
                                <Typography variant="body1">
                                    {c.comment}
                                </Typography>
                            </Card>
                        ))}
            </div>
            {/* {JSON.stringify(userComments)} */}
        </Layout>
    );
};

export default ProductDetails;
