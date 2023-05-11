import axios from "axios";
import { fetchOrderList } from "context/api";
import { getPrice } from "context/constants";
import { Context } from "context/contextApi";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function MyOrders() {
  const { orderList } = useContext(Context);

  return (
    <div className="container" style={{ minHeight: "100vh" }}>
      <div className="d-flex justify-content-between mt-5 ">
        <h6>Your Orders </h6>
      </div>
      <hr />
      {orderList?.map((item, i) => {
        var { product, Qty } = item;
        return (
          <div className="card mt-4 px-4" key={i}>
            <div className="d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center">
                <img
                  src={product?.Images[0]}
                  alt="Not Found"
                  style={{
                    width: "80px",
                    height: "80px",
                    objectFit: "contain",
                  }}
                  className="me-5"
                />

                <h4 className="text-truncate">
                  {product?.ProductName} <br />
                  <h5 className="text-danger">{getPrice(product?.MRP)} /-</h5>
                </h4>
              </div>

              <div className="d-flex align-items-center">
                <h5>
                  Qty: {Qty} | Total: {getPrice(product?.MRP * Qty)}
                </h5>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default MyOrders;
