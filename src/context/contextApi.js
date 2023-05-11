import { createContext, useEffect, useState } from "react";
import { fetchProducts } from "./api";
import React from "react";
import axios from "axios";

// @ts-ignore
export const Context = createContext();

const AppContext = (props) => {
  const [productList, setProductList] = useState([]);
  const [cartItemList, setCartItemList] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState("products");
  const [loading, setLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [orderList, setOrderList] = useState([]);

  useEffect(() => {
    fetchCategoriesProducts(selectedCategories);

    if (currentUser != "") {
      fetchOder();
    }
  }, [selectedCategories, currentUser]);

  const fetchCategoriesProducts = async (query) => {
    setLoading(true);
    fetchProducts(`${query}`).then(({ data }) => {
      setProductList(data);
      setLoading(false);
    });
  };

  const fetchOder = async () => {
    axios.get("http://localhost:3000/api/orders").then(({ data }) => {
      data.data?.forEach((item) => {
        // @ts-ignore
        if (currentUser?._id === item.UserId) {
          setOrderList(item.Products);
          //console.log(item?.Products);
        }
      });
    });
  };

  return (
    <Context.Provider
      value={{
        productList,
        setProductList,
        selectedCategories,
        setSelectedCategories,
        loading,
        setLoading,
        currentUser,
        setCurrentUser,
        isLoggedIn,
        setIsLoggedIn,
        cartItemList,
        setCartItemList,
        orderList,
        setOrderList,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};

export default AppContext;
