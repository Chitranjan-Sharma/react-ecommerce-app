import React, { useContext, useEffect, useState } from "react";
import { rupee } from "../context/constants";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "context/contextApi";
import axios from "axios";
import { fetchCartList } from "context/api";

function ProductCard({ product }) {
  const { setCartItemList, currentUser } = useContext(Context);
  const navigate = useNavigate();
  const getPrice = (MRP) => {
    return rupee.format(MRP);
  };

  const addToCart = async () => {
    if (currentUser !== "") {
      await axios
        .post(
          "http://localhost:3000/api/carts",
          JSON.stringify({
            UserId: currentUser?._id,
            ProductId: product?._id,
            Qty: 1,
          }),
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then(
          ({ data }) => {
            alert("Item added to cart");
            fetchCartList().then(({ data }) => {
              var list = [];
              data?.forEach((element) => {
                if (element.UserId === currentUser?._id) {
                  list.push(element);
                }
              });

              setCartItemList(list);
              list = [];
            });
          },
          (err) => {
            console.log(err);
          }
        );
    } else {
      navigate("/login");
    }
  };

  return (
    <div
      className="card flex-col justify-content-between col-md-3  p-3 mt-4 mx-2 my-2 position-relative "
      id="cardItem"
    >
      <Link to={`/productDetails/${product._id}`} className="btn">
        <img
          className=" p-3"
          src={product.Images[0]}
          style={{ width: "100%", height: "160px", objectFit: "contain" }}
          alt="Image not found"
        />
      </Link>

      <h6 className="text-truncate">{product.ProductName}</h6>
      <h5 className="text-danger fw-bold">{getPrice(product.MRP)}</h5>

      <button className="btn position-absolute top-0 end-0 text-danger">
        <img
          src="https://img.icons8.com/color/48/null/like--v1.png"
          style={{ height: "30px", width: "30px" }}
        />
      </button>

      <div className="row">
        <button
          className="btn col mx-1 btn-success  btn-sm text-white fw-bold"
          onClick={() => {
            if (currentUser !== "") {
              navigate(`/buy-product/${product._id}`);
            } else {
              navigate("/login");
            }
          }}
        >
          BUY NOW
        </button>
        <button
          className="btn btn-sm col mx-1 btn-warning text-white fw-bold"
          onClick={addToCart}
        >
          ADD TO CART
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
