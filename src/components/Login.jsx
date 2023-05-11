import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import "../index.css";
import { Context } from "context/contextApi";
import { fetchCartList, fetchOrderList, userLogin } from "context/api";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const {
    currentUser,
    setCurrentUser,
    loading,
    setLoading,
    isLoggedIn,
    setIsLoggedIn,
    setCartItemList,
    setOrderList,
  } = useContext(Context);

  const navigate = useNavigate();

  useEffect(() => {
    setIsLoggedIn(false);
    setCurrentUser("");
  }, []);

  const userLoginToAccount = (e) => {
    e.preventDefault();
    setLoading(true);

    email != "" && password != ""
      ? userLogin().then(({ data }) => {
          data.forEach((element) => {
            if (element?.Email === email && element?.Password === password) {
              setLoading(false);
              setIsLoggedIn(true);
              setCurrentUser(element);

              setEmail("");
              setPassword("");

              return;
            } else {
              setLoading(false);
            }
          });
        })
      : alert("Both fields required !");

    fetchCartItems();
  };

  const fetchCartItems = () => {
    fetchCartList().then(({ data }) => {
      var list = [];
      data?.forEach((element) => {
        if (element.UserId === currentUser?._id) {
          list.push(element);
        }
      });

      setCartItemList(list);
      list = [];
      navigate("/");
      return;
    });
  };

  const emailInput = (event) => {
    setEmail(event.target.value);
  };

  const passwordInput = (event) => {
    setPassword(event.target.value);
  };

  return (
    <div className="py-5 d-flex  justify-content-center  container">
      <div
        className="col-md-10 mt-5 row d-flex align-items-center justify-content-between shadow"
        style={{ borderRadius: "40px" }}
      >
        <div
          className="col-md-5 py-5 bg-light"
          style={{ borderRadius: "40px" }}
        >
          <p className="text-center">we welcome you !</p>
          <h1 className="text-center fw-bold mb-5">Login</h1>
          <form className="mx-5" onSubmit={userLoginToAccount}>
            <div className="mb-3">
              <label className="form-label">Email address</label>
              <input
                type="email"
                className="form-control"
                onChange={emailInput}
                value={email}
              />
              <div id="emailHelp" className="form-text">
                We'll never share your email with anyone else.
              </div>
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                onChange={passwordInput}
                value={password}
              />
            </div>
            <h6 className="text-end mb-4">Forgot password ?</h6>
            <button type="submit" className="btn btn-primary fw-bold w-100">
              Login
            </button>

            <p className="text-center mt-5 fw-bold">
              New customer ? <Link to={"/register"}>Register</Link>{" "}
            </p>
          </form>
        </div>
        <img
          className="col-md-7 rounded object-fit-contain "
          height="500px"
          src="https://img.freepik.com/free-vector/mobile-login-concept-illustration_114360-135.jpg?w=2000"
          alt=""
        />
      </div>
    </div>
  );
}

export default Login;
