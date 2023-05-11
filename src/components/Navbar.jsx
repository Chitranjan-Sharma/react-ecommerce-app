import React, { useContext } from "react";

import "../index.css";
import { Link } from "react-router-dom";
import { Context } from "context/contextApi";

function Navbar() {
  const { isLoggedIn, cartItemList } = useContext(Context);

  return (
    <div className="sticky-top navColor ">
      <nav className="navbar container">
        <div className="container-fluid">
          <Link className="navbar-brand fw-bold text-white" to={"/"}>
            ShopMart
          </Link>

          <form className="d-flex w-50 " role="search">
            <input
              className="form-control  me-2 rounded-pill px-4"
              type="search"
              placeholder="Search products, brands, categories, price etc."
              aria-label="Search"
            />
          </form>
          <span className="navbar-text ">
            <Link className="btn fw-bold text-white linkHover me-3" to={"/"}>
              Products
            </Link>

            {isLoggedIn ? (
              <Link
                className="btn fw-bold text-white linkHover me-3"
                to={isLoggedIn ? "/my-orders-page" : "/login"}
              >
                Orders
              </Link>
            ) : (
              ""
            )}

            {isLoggedIn ? (
              <Link
                to={"/cart-page"}
                className="btn text-white pe-5 fw-bold me-3 position-relative linkHover"
              >
                Cart
                <p
                  className="position-absolute me-3 top-0 end-0 rounded-circle bg-danger "
                  style={{ width: "25px", height: "25px" }}
                >
                  {cartItemList.length}
                </p>
              </Link>
            ) : (
              ""
            )}

            <Link to={"/login"} className="btn text-white fw-bold linkHover">
              {isLoggedIn ? "Logout" : "Login"}
            </Link>
          </span>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
