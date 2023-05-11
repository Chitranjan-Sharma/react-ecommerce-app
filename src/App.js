import { useContext } from "react";
import AppContext from "./context/contextApi";
import Context from "./context/contextApi";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import ProductDetails from "./components/ProductDetails";
import Login from "./components/Login";
import Register from "./components/Register";
import React from "react";
import CheckOut from "components/CheckOut";
import CartPage from "components/CartPage";
import BuySingleProduct from "components/BuySingleProduct";
import Footer from "components/Footer";
import MyOrders from "components/MyOrders";

function App() {
  return (
    <AppContext>
      <BrowserRouter>
        <div className="bgImg ">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/productDetails/:id" element={<ProductDetails />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/checkout" element={<CheckOut />} />
            <Route path="/buy-product/:id" element={<BuySingleProduct />} />
            <Route path="/cart-page" element={<CartPage />} />
            <Route path="/my-orders-page" element={<MyOrders />} />
          </Routes>
          <Footer />
        </div>
      </BrowserRouter>
    </AppContext>
  );
}

export default App;
