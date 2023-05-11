import axios from "axios";
import { fetchProductById } from "context/api";
import { getPrice } from "context/constants";
import { Context } from "context/contextApi";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const BuySingleProduct = () => {
  const [singleProduct, setSingleProduct] = useState();
  const [singleImageUrl, setSingleImageUrl] = useState();
  // @ts-ignore
  const [itemQty, setItemQty] = useState(1);
  const { id } = useParams();
  const { currentUser } = useContext(Context);

  const [totalAmount, setTotalAmount] = useState(0);

  const [fullName, setFullName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [cartNumber, setCardNumber] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    getSingleProduct();
  }, [id]);

  function getSingleProduct() {
    fetchProductById(id).then(({ data }) => {
      setSingleProduct(data);
      setSingleImageUrl(data?.Images[0]);
      console.log(singleProduct);
    });
  }

  const placeOrder = async (e) => {
    e.preventDefault();

    if (
      fullName != "" &&
      emailAddress != "" &&
      contactNumber != "" &&
      address != "" &&
      city != "" &&
      state != "" &&
      zipCode != "" &&
      cartNumber != ""
    ) {
      var orderItem = {
        UserId: currentUser._id,
        Products: [
          {
            product: singleProduct,
            Qty: itemQty < 1 ? 1 : itemQty,
          },
        ],
        TotalAmount: totalAmount,
      };

      console.log(orderItem);
      await axios
        .post("http://localhost:3000/api/orders", JSON.stringify(orderItem), {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then(
          ({ data }) => {
            navigate("/my-orders-page");
          },
          (err) => {
            console.log(err);
          }
        );
    } else {
      alert("All fields required !");
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow py-4">
        <div className="row d-flex justify-content-evenly">
          <div className="col col-md-7">
            <form className="w-100" onSubmit={placeOrder}>
              <h5>Shipping Details</h5>
              <hr />
              <div className="d-flex justify-content-evenly w-100">
                <div className="col ">
                  <label className="" htmlFor="fullName">
                    Full Name
                  </label>
                  <input
                    className="form-control "
                    type="text"
                    name="fullName"
                    value={fullName}
                    onChange={(e) => {
                      setFullName(e.target.value);
                    }}
                  />
                </div>

                <div className="col mx-1">
                  <label className="" htmlFor="emailAddress">
                    Email Address
                  </label>
                  <input
                    className="form-control "
                    type="text"
                    name="emailAddress"
                    value={emailAddress}
                    onChange={(e) => {
                      setEmailAddress(e.target.value);
                    }}
                  />
                </div>

                <div className="col ">
                  <label className="" htmlFor="contactNumber">
                    Contact Number
                  </label>
                  <input
                    className="form-control "
                    type="text"
                    name="contactNumber"
                    value={contactNumber}
                    onChange={(e) => {
                      setContactNumber(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="mt-4">
                <label className="" htmlFor="shippingAd">
                  Shipping Address
                </label>
                <input
                  className="form-control "
                  type="text"
                  name="shippingAd"
                  value={address}
                  onChange={(e) => {
                    setAddress(e.target.value);
                  }}
                />
              </div>
              <div className="d-flex justify-content-evenly w-100 mt-4">
                <div className="col ">
                  <label className="" htmlFor="city">
                    City
                  </label>
                  <input
                    className="form-control "
                    type="text"
                    name="city"
                    value={city}
                    onChange={(e) => {
                      setCity(e.target.value);
                    }}
                  />
                </div>

                <div className="col mx-1">
                  <label className="" htmlFor="residenceState">
                    State
                  </label>
                  <input
                    className="form-control "
                    type="text"
                    name="residenceState"
                    value={state}
                    onChange={(e) => {
                      setState(e.target.value);
                    }}
                  />
                </div>

                <div className="col ">
                  <label className="" htmlFor="zipCode">
                    Zip-Code
                  </label>
                  <input
                    className="form-control "
                    type="number"
                    name="zipCode"
                    value={zipCode}
                    onChange={(e) => {
                      setZipCode(e.target.value);
                    }}
                  />
                </div>
              </div>

              <hr />
              <h4>Payment Methods</h4>

              <div className="row w-100 mt-4">
                <div className="col-md-8">
                  <div className="row w-100">
                    <div className="col">
                      <label className="" htmlFor="nameOnCard">
                        Name On Card
                      </label>
                      <input
                        className="form-control "
                        type="text"
                        name="nameOnCard"
                      />
                    </div>
                    <div className="col">
                      <label className="" htmlFor="cardNumber">
                        Card Number
                      </label>
                      <input
                        className="form-control "
                        type="text"
                        name="cardNumber"
                        value={cartNumber}
                        onChange={(e) => {
                          setCardNumber(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <div className="row w-100 mt-4">
                    <div className="col">
                      <label className="" htmlFor="cvvNumber">
                        CVV Number
                      </label>
                      <input
                        className="form-control "
                        type="text"
                        name="cvvNumber"
                      />
                    </div>
                    <div className="col">
                      <label className="" htmlFor="expMY">
                        Expiry MM/YY
                      </label>
                      <input
                        className="form-control "
                        type="text"
                        name="expMY"
                      />
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <img
                    className="w-100"
                    style={{ objectFit: "contain", height: "150px" }}
                    src="https://cdn.creazilla.com/illustrations/1720661/debit-card-bank-free-illustrations-illustration-md.png"
                    alt="Not Found"
                  />
                </div>
              </div>

              <div className="d-flex align-items-center w-50 mt-4">
                <label className="fw-bold me-4">Continue</label>
                <button type="submit" className=" btn btn-danger btn-sm">
                  Place Order
                </button>
              </div>
            </form>
          </div>
          <div className="col col-md-4 bg-light position-relative text-center">
            <h5>Product Details</h5>
            <div
              style={{
                overflow: "scroll",
                overflowX: "hidden",
                maxHeight: "500px",
              }}
            >
              <img
                className="object-fit-contain"
                src={singleImageUrl}
                alt=""
                width="250px"
                height="250px"
              />

              <h6>
                {
                  // @ts-ignore
                  singleProduct?.ProductName
                }
              </h6>
              <h6>
                {getPrice(
                  // @ts-ignore
                  singleProduct?.MRP
                )}
              </h6>
              <input
                type="number"
                value={itemQty}
                onChange={(e) => {
                  setItemQty(Number.parseInt(e.target.value));
                }}
              />
            </div>

            <div
              className="position-absolute bottom-0 w-100 d-flex justify-content-center"
              style={{ height: "60px" }}
            >
              <h4 className="text-danger fw-bold">
                Total :{" "}
                {getPrice(
                  // @ts-ignore
                  singleProduct?.MRP
                )}
              </h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuySingleProduct;
