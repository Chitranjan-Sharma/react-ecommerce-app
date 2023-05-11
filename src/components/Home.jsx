import React, { useContext } from "react";
import { Context } from "../context/contextApi";
import ProductCard from "./ProductCard";
import { categories } from "../context/constants";
import { Link, NavLink } from "react-router-dom";

function Home() {
  const { loading, productList } = useContext(Context);
  return (
    <div className="container" style={{ minHeight: "100vh" }}>
      <div
        className="position-relative d-flex align-items-center align-items-center px-5"
        style={{ height: "70vh" }}
      >
        <div className="w-50">
          <h1
            style={{
              fontSize: "100px",
              color: "rgb(91, 91, 177)",
              fontWeight: "bold",
            }}
          >
            Online
          </h1>
          <h1 className="fw-bold " style={{ fontStyle: "italic" }}>
            Shopping With ShopMart !
          </h1>
          <p>We are emerging E-Commerce platform for our users ?</p>
          <br />

          <a
            className="btn btn-lg rounded-pill mt-5 fw-bold border bg-primary text-white"
            href="#productsSection"
          >
            Explore
          </a>
        </div>

        <img
          className="w-50 object-fit-contain"
          src="https://cdn.dribbble.com/users/1170793/screenshots/6018665/ecommerce-illustration.png"
          alt=""
        />
      </div>

      <div className="row d-flex justify-content-evenly" id="productsSection">
        {!loading ? (
          productList.map((item) => {
            return <ProductCard key={item._id} product={item} />;
          })
        ) : (
          <div>Nothing to show</div>
        )}
      </div>
    </div>
  );
}

export default Home;
