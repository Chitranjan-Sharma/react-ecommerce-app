import axios from "axios";
import { fetchCartList } from "context/api";
import { getPrice } from "context/constants";
import { Context } from "context/contextApi";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

function CartPage() {
  const {
    cartItemList,
    setCartItemList,
    productList,
    currentUser,
    isLoggedIn,
  } = useContext(Context);
  const [cartProducts, setCartProduct] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    if (isLoggedIn) {
      fetchCartProducts();
    }
  }, [cartItemList]);

  const fetchCartProducts = async () => {
    await fetchCartList().then(({ data }) => {
      var list = [];
      data?.forEach((element) => {
        if (element.UserId === currentUser?._id) {
          list.push(element);
        }
      });

      setCartItemList(list);
      list = [];
    });

    var list = [];
    var amount = 0;
    cartItemList?.forEach((cartItem) => {
      productList?.forEach((product) => {
        if (product._id === cartItem?.ProductId) {
          var p = {
            product: product,
            Qty: cartItem.Qty,
            id: cartItem._id,
          };

          list.push(p);

          amount += product.MRP * cartItem.Qty;

          return;
        }
      });
    });

    setCartProduct(list);
    setTotalAmount(amount);
    list = [];
    amount = 0;
  };

  return cartItemList.length != 0 ? (
    <div className="container" style={{ minHeight: "100vh" }}>
      <div className="d-flex justify-content-between mt-5 ">
        <h6>Cart Items</h6>
        <h4 className="text-danger">Total: {getPrice(totalAmount)} /-</h4>
        <Link className="btn fw-bold" to={"/checkout"}>
          Continue Checkout
        </Link>
      </div>
      <hr />
      {cartProducts?.map((item) => {
        var { product, Qty, id } = item;
        return (
          <div className="card mt-4 p-4 position-relative">
            <div className="d-flex justify-content-between align-items-center">
              <div className="d-flex w-75 justify-content-start align-items-center">
                <img
                  src={product.Images[0]}
                  alt="Not Found"
                  style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "contain",
                  }}
                  className="me-5"
                />
                <div className="text-truncate">
                  <h4>{product.ProductName}</h4>
                  <div className="d-flex align-items-center">
                    <h3 className="text-danger">{getPrice(product.MRP)} /-</h3>
                    <h6>
                      , Qty: {Qty} = {getPrice(product.MRP * Qty)}
                    </h6>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <img
                  width="30"
                  height="30"
                  src="https://img.icons8.com/fluency/48/add.png"
                  alt="add"
                />
                <br />
                <img
                  width="30"
                  height="30"
                  src="https://img.icons8.com/fluency/48/minus.png"
                  alt="minus"
                />
              </div>
            </div>
            <img
              width="24"
              height="24"
              src="https://img.icons8.com/plumpy/24/close-window.png"
              alt="close-window"
              className="position-absolute top-0 end-0"
              onClick={() => {
                axios.delete(`http://localhost:3000/api/carts/${id}`).then(
                  ({ data }) => {
                    fetchCartProducts();
                  },
                  (err) => {
                    console.log(err);
                  }
                );
              }}
            />
          </div>
        );
      })}
    </div>
  ) : (
    <div className="container text-center py-5" style={{ minHeight: "100vh" }}>
      <h5>Nothing to show here !</h5> <br />
      <Link className="btn rounded-pill btn-primary fw-bold" to={"/"}>
        Start Shopping
      </Link>
    </div>
  );
}

export default CartPage;
