import { useEffect, useState } from "react";
import Layout from "../Layout";
import { API } from "../../utils/config";
import { Link, useParams } from "react-router-dom";
import { showSuccess, showError } from "../../utils/messages";
import { Breadcrumbs, Button, Card, Typography } from "@mui/material";
import { getProductDetails } from "../../api/apiProduct";
import {
  addToCart,
  postComment,
  getComment,
  getCartItems,
} from "../../api/apiOrder";
import { isAuthenticated, userInfo } from "../../utils/auth";
import { toast } from "react-toastify";

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
      .catch((err) => toast.error("Failed to load products"));

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
      //   getCartItems(userInfo().token)
      //         .then((response) => {
      //         //   setCartItems(response.data);
      //         //   localStorage.setItem(
      //         //     "cartTotal",
      //         //     JSON.stringify(response?.data.length)
      //         //   );
      //         })
      //         .catch((err) => console.log(err.response));
      //         return
      addToCart(user.token, cartItem)
        .then((response) => {
          if (response.data?.message === "Item already exists in cart!") {
            toast.error("Item already exists in cart!");
          } else {
            setSuccess(true);
          }
        })
        .catch((err) => {
          //! ?????--------problem-------?????????
          console.log(err.response);
          if (err.response) toast.error(err.response.data);
          else toast.error("Adding to cart failed!");
        });
    } else {
      setSuccess(false);
      toast.error("Please Login First");
    }
  };

  const handleComment = (e) => {
    setComment(e.target.value);
  };

  const handleSubmit = (e) => {
    if (isAuthenticated()) {
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
    } else {
      setSuccess(false);
      setComment("");
      toast.error("Please Login First");
    }
  };

  return (
    <Layout title="Product Page">
      {/* <Breadcrumbs aria-label="breadcrumb">
                <Link to="/" underline="hover" color="inherit">
                    Home
                </Link>
                <Link to="#" underline="hover" color="inherit">
                    Product
                </Link>
                <Typography color="text.primary">
                    Home Page Navigation
                </Typography>
            </Breadcrumbs> */}
      <div className="mt-[-1.5rem]">
        <div>
          {showSuccess(success, "Item Added to Cart!")}
          {showError(error, error)}
        </div>
        <div className="flex flex-col md:flex-row p-5 gap-5">
          {/* Image + Info Section */}
          <div className="w-full md:w-1/2 h-full md:h-1/2 flex flex-col md:flex-row items-center justify-center p-4 border rounded border-slate-200 shadow-lg bg-white">
            {/* Image */}
            <div className="flex justify-center items-center w-full md:w-1/2 max-h-[20rem] p-2">
              <img
                src={`${API}/product/photo/${product._id}`}
                alt={product.name}
                className="max-w-full max-h-[20rem] object-contain"
              />
            </div>

            {/* Details */}
            <div className="w-full md:w-1/2 mt-4 md:mt-0 md:ml-4">
              <div className="flex flex-col gap-2 sm:text-left text-center">
                <Typography variant="h5">{product.name}</Typography>
                <p className="font-semibold">&#2547;{product.price}</p>
                <div>
                  {product.quantity ? (
                    <span className="px-3 py-1 bg-green-500 text-white badge rounded-full">
                      In Stock
                    </span>
                  ) : (
                    <span className="px-3 py-1 bg-red-500 text-white badge rounded-full">
                      Out of Stock
                    </span>
                  )}
                </div>
                {product.quantity && (
                  <div className="sm:text-left text-center">
                    <button
                      sx={{ marginTop: 2 }}
                      variant="contained"
                      onClick={handleAddToCart(product)}
                      className="btn btn-info btn-sm lg:btn-md"
                    >
                      Add to Cart
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Comments Section */}
          <div className="w-full md:w-1/2 p-4  border rounded border-slate-200 shadow-lg bg-white sm:text-left text-center">
            <div className="my-4">
              <p className="font-semibold text-2xl sm:text-3xl">
                Give your feedback
              </p>
              <div>
                <input
                  className="w-full border border-2 rounded-md p-3 my-4"
                  type="text"
                  placeholder="comment"
                  value={comment}
                  onChange={handleComment}
                  required
                />
                <button
                  sx={{ marginTop: 2 }}
                  variant="contained"
                  onClick={handleSubmit}
                  className="btn btn-info btn-sm lg:btn-md"
                >
                  Post Comment
                </button>
              </div>
            </div>

            <div>
              <p className="font-semibold text-2xl sm:text-3xl">Comments:</p>
              <div className="max-h-[20rem] overflow-y-auto">
                {userComments?.length > 0 &&
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
                        <Typography variant="body1">{c.comment}</Typography>
                      </Card>
                    ))}
              </div>
            </div>
          </div>
        </div>

        {/* <div className="flex flex-col md:flex-row p-5 border bg-white rounded-lg">
          <div className="basis-2/4 w-auto max-h-[20rem] flex items-center justify-evenly border rounded border-slate-200 shadow-lg">
            <img
              src={`${API}/product/photo/${product._id}`}
              alt={product.name}
              className="max-w-[20rem] max-h-[20rem]"
            />
            <div className="">
              <div className="flex">
                <div>
                  <Typography variant="h5">{product.name}</Typography>
                  <p className="font-semibold" variant="body1">
                    &#2547;{product.price}
                  </p>
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
          </div>
          <div className="px-5 basis-2/4 w-auto border rounded border-slate-200 shadow-lg mx-2">
            
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
                      <Typography variant="body1">{c.comment}</Typography>
                    </Card>
                  ))}
            </div>
          </div>
        </div> */}
      </div>
      {/* {JSON.stringify(userComments)} */}
    </Layout>
  );
};

export default ProductDetails;
