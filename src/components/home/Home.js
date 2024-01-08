import React from "react";
import { useState, useEffect } from "react";
import Layout from "../Layout";
import ProductCard from "./Card";
import { showError, showSuccess } from "../../utils/messages";
import CheckBox from "./CheckBox";
import RadioBox from "./RadioBox";
import Ordering from "./Ordering";
import SortOption from "./SortOption";
import Search from "./Search";
import { prices } from "../../utils/prices";
import { isAuthenticated, userInfo } from "../../utils/auth";
import { addToCart } from "../../api/apiOrder";
import { Button, Grid, Typography } from "@mui/material";
import {
    getProducts,
    getCategories,
    getOrderedProducts,
    getSearchedProduct,
    getFilteredProducts,
    getProductsSortedBySold,
    getProductsSortedByPrice,
    getProductsSortedByReviews,
} from "../../api/apiProduct";

//! MY HOME ---------------
const Home = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [limit, setLimit] = useState(4);
    const [skip, setSkip] = useState(0);
    const [order, setOrder] = useState("asc");
    const [sortBy, setSortBy] = useState("createdAt");
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [searched, setSearched] = useState("");
    const [filters, setFilters] = useState({
        category: [],
        price: [],
    });

    useEffect(() => {
        //todo ==>> modification
        getProducts(sortBy, order, limit, skip)
            .then((response) => setProducts(response.data))
            .catch((err) => setError("Failed to load products From Backend!"));

        getCategories()
            .then((response) => setCategories(response.data))
            .catch((err) => {
                console.log(err);
                setError("Failed to load categories!");
            });
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
                    //! ??????????????
                    console.log(err.response);
                    if (err.response) setError(err.response.data);
                    else setError("Adding to cart failed!");
                });
        } else {
            setSuccess(false);
            setError("Please Login First!");
        }
    };

    const handleFilters = (myfilters, filterBy) => {
        const newFilters = { ...filters };
        if (filterBy === "category") {
            newFilters[filterBy] = myfilters;
        }
        if (filterBy === "price") {
            const data = prices;
            let arr = [];
            for (let i in data) {
                if (data[i].id === parseInt(myfilters)) {
                    arr = data[i].arr;
                }
            }
            newFilters[filterBy] = arr;
        }

        setFilters(newFilters);
        getFilteredProducts(skip, limit, newFilters, order, sortBy)
            .then((response) => setProducts(response.data))
            .catch((err) => setError("Failed to load products!"));
    };

    //todo ==> Modification

    const handleOrder = (e) => {
        const order = e.target.value;

        getOrderedProducts(order, sortBy)
            .then((res) => setProducts(res.data))
            .catch((err) => console.log(err.message));
    };

    const handleSortOption = (e) => {
        const option = e.target.value;
        //todo ==> Convert this into switch
        if (option === "price") {
            getProductsSortedByPrice(option)
                .then((res) => setProducts(res.data))
                .catch((err) => console.log(err));
        }
        if (option === "sold") {
            getProductsSortedBySold(option)
                .then((res) => setProducts(res.data))
                .catch((err) => console.log(err));
        }
        if (option === "review") {
            getProductsSortedByReviews(option)
                .then((res) => setProducts(res.data))
                .catch((err) => console.log(err));
        }
    };

    const handleLoadMore = () => {
        const newSkip = skip + 1;
        setSkip(newSkip);

        getProducts(sortBy, order, limit, newSkip)
            .then((response) => setProducts(response.data))
            .catch((err) => setError("Failed to load products From Backend!"));
    };

    //* ------------- Searching ------------------

    const handleSearchInput = (e) => {
        const searchInput = e.target.value;
        setSearched(searchInput);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();

        const searchInput = e.target.value;
        setSearched(searchInput);
        console.log("searchInput =>", searched);

        getSearchedProduct(searched)
            .then((res) => setProducts(res.data))
            .catch((err) => console.log(err));
    };

    const showFilters = () => {
        return (
            <div className="mb-10">
                <Grid container>
                    <Grid item md={2}>
                        <Typography variant="h5">
                            Categories:
                        </Typography>
                        <ul>
                            {/* {JSON.stringify(categories)} */}
                            <CheckBox
                                categories={categories}
                                handleFilters={(myfilters) =>
                                    handleFilters(myfilters, "category")
                                }
                            />
                        </ul>
                        {/* {JSON.stringify(filters)} */}
                    </Grid>
                    <Grid item md={2}>
                        <Typography variant="h5">Prices:</Typography>

                        <div className="">
                            <RadioBox
                                prices={prices}
                                handleFilters={(myfilters) =>
                                    handleFilters(myfilters, "price")
                                }
                            />
                        </div>
                    </Grid>
                    {/* //todo ==> Modifications */}
                    <Grid item md={2}>
                        <Typography variant="h5">By order:</Typography>
                        <Ordering handleOrder={handleOrder} />
                    </Grid>
                    <Grid item md={2}>
                        <Typography variant="h5">Sort By:</Typography>
                        <SortOption handleSortOption={handleSortOption} />
                    </Grid>
                    <Grid item md={4}>
                        <Search
                            className="w-full"
                            handleSearchInput={handleSearchInput}
                            handleSearchSubmit={handleSearchSubmit}
                        />
                    </Grid>
                </Grid>
            </div>
        );
    };

    return (
        <Layout title="Home Page">
            {showFilters()}
            <div style={{ width: "100%" }}>
                {showError(error, error)}
                {showSuccess(success, "Added to cart")}
            </div>
            <div className="mb-10">
                <Grid
                    container
                    // rowSpacing={1}
                    columnSpacing={{ xs: 1, sm: 2, md: 0 }}
                >
                    {products &&
                        products.map((product) => (
                            <Grid item lg={3} md={6} sm={6} xs={12}>
                                <ProductCard
                                    product={product}
                                    key={product._id}
                                    handleAddToCart={handleAddToCart(product)}
                                />
                            </Grid>
                        ))}
                </Grid>
            </div>
            <div className="mb-7 w-full text-center">
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleLoadMore}
                >
                    Load more...
                </Button>
            </div>
        </Layout>
    );
};

export default Home;
