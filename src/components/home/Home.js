import React, { useRef } from "react";
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
import { toast } from "react-toastify";

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
      .catch((err) => toast.error("Failed to load products From Backend!"));

    getCategories()
      .then((response) => setCategories(response.data))
      .catch((err) => {
        console.log(err);
        toast.error("Failed to load categories!");
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
          if (err.response) toast.error(err.response.data);
          else toast.error("Adding to cart failed!");
        });
    } else {
      setSuccess(false);
      toast.error("Please Login First");
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
      .catch((err) => toast.error("Failed to load products!"));
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
      .then((response) => {
        if (response?.data?.length > 0) {
          setProducts((prev) => [...prev, ...response?.data]);
        } else {
        }
      })
      .catch((err) => toast.error("Failed to load products From Backend!"));
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
      <>
        <div className="flex flex-col sm:flex-row">
          {/* <div className="mb-10 mt-[-20px] max-w-fit mx-auto text-center">
            <div className="collapse bg-white collapse-plus">
              <input type="checkbox" />
              <div className="collapse-title text-xl font-medium">
                Admin and Coupon Information
              </div>
              <div className="collapse-content text-left ">
                <div className="">
                  <p className="font-semibold py-4 text-center">
                    Admin mail: neephat.benazir@gmail.com <br />
                    Admin Password: 12345678 <br />
                    Coupon Code: 12345670 for 70% <br />
                    123450 for 50% <br />
                    1230 for 30%
                  </p>
                </div>
              </div>
            </div>
          </div> */}

          <div className="mb-10 mt-[-20px] w-auto mx-auto ">
            <button
              className="btn btn-accent rounded"
              onClick={() => setIsOpenFilter((prev) => !prev)}
            >
              Filters
            </button>

            {isOpenFilter && (
              <div
                ref={filterRef}
                className="absolute z-40 left-0 bg-white border shadow-lg mt-2 max-w-fit p-4 rounded-box border border-teal-300"
              >
                <Grid container>
                  <Grid item md={3}>
                    <div className="collapse bg-white collapse-open ">
                      <input type="checkbox" />
                      <div className="collapse-title text-xl font-medium">
                        Categories
                      </div>
                      <div className="collapse-content">
                        <ul>
                          {/* {JSON.stringify(categories)} */}
                          <CheckBox
                            categories={categories}
                            handleFilters={(myfilters) =>
                              handleFilters(myfilters, "category")
                            }
                          />
                        </ul>
                      </div>
                    </div>
                    {/* {JSON.stringify(filters)} */}
                  </Grid>
                  <Grid item md={3}>
                    <div className="collapse bg-white collapse-open ">
                      <input type="checkbox" />
                      <div className="collapse-title text-xl font-medium">
                        Prices
                      </div>
                      <div className="collapse-content bg-white rounded">
                        <ul className="bg-white p-2 ">
                          {/* {JSON.stringify(categories)} */}
                          <RadioBox
                            prices={prices}
                            handleFilters={(myfilters) =>
                              handleFilters(myfilters, "price")
                            }
                          />
                        </ul>
                      </div>
                    </div>
                  </Grid>
                  {/* //todo ==> Modifications */}
                  <Grid item md={2}>
                    <p className="text-lg">By order:</p>
                    <Ordering handleOrder={handleOrder} />
                    <div className="my-2">
                      <p className="text-lg">Sort By:</p>
                      <SortOption handleSortOption={handleSortOption} />
                    </div>
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
            )}
          </div>
          <div className="mb-10 mt-[-20px] w-auto mx-auto text-center ">
            <button
              className="btn  btn-accent"
              onClick={() => setIsOpen((prev) => !prev)}
            >
              Admin and Coupon Information
            </button>

            {isOpen && (
              <div
                ref={contentRef}
                className="absolute z-40 right-0 bg-white border shadow-lg mt-2 max-w-fit p-4 rounded-box border border-teal-300"
              >
                <div className="">
                  <p className="font-semibold py-4 text-center">
                    Admin mail: neephat.benazir@gmail.com <br />
                    Admin Password: 12345678 <br />
                    Coupon Code: 12345670 for 70% <br />
                    123450 for 50% <br />
                    1230 for 30%
                  </p>
                </div>
              </div>
            )}
          </div>
          {/* <div className="mb-10 mt-[-20px] max-w-fit mx-auto text-center">
            <div className="collapse bg-white collapse-plus">
              <input type="checkbox" />
              <div className="collapse-title text-xl font-medium">Filters</div>
              <div className="collapse-content text-left">
                <Grid container>
                  <Grid item md={3}>
                    <div className="collapse bg-white collapse-open ">
                      <input type="checkbox" />
                      <div className="collapse-title text-xl font-medium">
                        Categories
                      </div>
                      <div className="collapse-content">
                        <ul>
                         
                          <CheckBox
                            categories={categories}
                            handleFilters={(myfilters) =>
                              handleFilters(myfilters, "category")
                            }
                          />
                        </ul>
                      </div>
                    </div>
                 
                  </Grid>
                  <Grid item md={3}>
                    <div className="collapse bg-white collapse-open ">
                      <input type="checkbox" />
                      <div className="collapse-title text-xl font-medium">
                        Prices
                      </div>
                      <div className="collapse-content bg-white rounded">
                        <ul className="bg-white p-2 ">
                       
                          <RadioBox
                            prices={prices}
                            handleFilters={(myfilters) =>
                              handleFilters(myfilters, "price")
                            }
                          />
                        </ul>
                      </div>
                    </div>
                  </Grid>
                
                  <Grid item md={2}>
                    <p className="text-lg">By order:</p>
                    <Ordering handleOrder={handleOrder} />
                    <div className="my-2">
                      <p className="text-lg">Sort By:</p>
                      <SortOption handleSortOption={handleSortOption} />
                    </div>
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
            </div>
          </div> */}
        </div>
      </>
    );
  };
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef(null);
  const [isOpenFilter, setIsOpenFilter] = useState(false);
  const filterRef = useRef(null);
  // Close collapse when clicked outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (contentRef.current && !contentRef.current.contains(event.target)) {
        setIsOpen(false);
      }
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setIsOpenFilter(false);
      }
    }
    if (isOpen || isOpenFilter) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, isOpenFilter]);
  return (
    <Layout title="Home Page">
      <div className="relative">
        {showFilters()}

        <div style={{ width: "100%" }}>
          {showError(error, error)}
          {showSuccess(success, "Added to cart")}
        </div>
        <div className="mb-10 mt-[-10px]">
          <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 ">
            {products &&
              products.map((product) => (
                <ProductCard
                  product={product}
                  key={product._id}
                  handleAddToCart={handleAddToCart(product)}
                />
              ))}
          </div>
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
      </div>
    </Layout>
  );
};

export default Home;
