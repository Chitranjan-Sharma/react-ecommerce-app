// @ts-ignore
import React, { useContext, useEffect, useState } from "react";
import { fetchCartList, fetchProductById } from "../context/api";
import { useNavigate, useParams } from "react-router-dom";
// @ts-ignore
import { Context } from "../context/contextApi";
import { getPrice } from "../context/constants";
import axios from "axios";
const ProductDetails = () => {
  const [singleProduct, setSingleProduct] = useState();
  const [singleImageUrl, setSingleImageUrl] = useState();
  const [itemQty, setItemQty] = useState(1);
  const { id } = useParams();

  const { setCartItemList, currentUser } = useContext(Context);

  const navigate = useNavigate();

  useEffect(() => {
    getSingleProduct();
  }, [id]);

  function getSingleProduct() {
    fetchProductById(id).then(({ data }) => {
      setSingleProduct(data);
      setSingleImageUrl(data?.Images[0]);
    });
  }

  const addToCart = async () => {
    if (currentUser !== "") {
      await axios
        .post(
          "http://localhost:3000/api/carts",
          JSON.stringify({
            UserId: currentUser?._id,
            // @ts-ignore
            ProductId: singleProduct?._id,
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
    <div className="container p-5" style={{ minHeight: "100vh" }}>
      <div className="row d-flex justify-content-between">
        <div className="col-md-6 ">
          <div className="row d-flex ">
            <div className="col-md-10 card p-3">
              <img
                src={singleImageUrl}
                alt="Not found"
                style={{
                  height: "500px",
                  width: "100%",
                  objectFit: "contain",
                }}
              />

              <div className="row d-flex justify-content-evenly mt-5">
                <button
                  className="btn col-md-5 m-1 btn-success text-white fw-bold"
                  onClick={() => {
                    if (currentUser !== "") {
                      // @ts-ignore
                      navigate(`/buy-product/${singleProduct?._id}`);
                    } else {
                      navigate("/login");
                    }
                  }}
                >
                  BUY NOW
                </button>
                <button
                  className="btn col-md-5 m-1 btn-warning text-white fw-bold"
                  onClick={addToCart}
                >
                  ADD TO CART
                </button>
              </div>
            </div>
            <div className="col-md-2">
              <div
                style={{
                  height: "450px",
                  overflow: "scroll",
                  overflowX: "clip",
                  width: "120px",
                }}
              >
                {
                  // @ts-ignore
                  singleProduct?.Images.map((url, i) => {
                    return (
                      <div
                        key={i}
                        onClick={() => {
                          setSingleImageUrl(url);
                        }}
                        onMouseOver={() => {
                          setSingleImageUrl(url);
                        }}
                        className="mx-2 my-3"
                        style={{ width: "80px", height: "80px" }}
                      >
                        <img
                          src={url}
                          alt="Not found"
                          style={{
                            borderRadius: "10px",
                            width: "80px",
                            height: "80px",
                            border: "1px solid grey",
                          }}
                        />
                      </div>
                    );
                  })
                }
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-5">
          <h3>
            {
              // @ts-ignore
              singleProduct?.ProductName
            }
          </h3>
          <h1 className="text-danger mt-5">
            {" "}
            {getPrice(
              // @ts-ignore
              singleProduct?.MRP
            )}{" "}
            /-
          </h1>

          <h5 className="px-2 mt-5">
            Total :{" "}
            {getPrice(
              // @ts-ignore
              singleProduct?.MRP * itemQty
            )}{" "}
            /-
          </h5>
          <div className="d-flex align-items-center mt-1 mb-5">
            <div className="dropdown">
              <button
                className="btn fw-bold dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                QTY : {`${itemQty}`} /-
              </button>
              <ul className="dropdown-menu">
                <li>
                  <button
                    className="dropdown-item"
                    type="button"
                    onClick={() => {
                      setItemQty(1);
                    }}
                  >
                    1
                  </button>
                </li>
                <li>
                  <button
                    className="dropdown-item"
                    type="button"
                    onClick={() => {
                      setItemQty(2);
                    }}
                  >
                    2
                  </button>
                </li>
                <li>
                  <button
                    className="dropdown-item"
                    type="button"
                    onClick={() => {
                      setItemQty(3);
                    }}
                  >
                    3
                  </button>
                </li>
                <li>
                  <button
                    className="dropdown-item"
                    type="button"
                    onClick={() => {
                      setItemQty(4);
                    }}
                  >
                    4
                  </button>
                </li>
              </ul>
            </div>
          </div>

          <hr />
          <h5>About product</h5>
          <p style={{ textAlign: "justify" }}>
            {
              // @ts-ignore
              singleProduct?.Details
            }
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
