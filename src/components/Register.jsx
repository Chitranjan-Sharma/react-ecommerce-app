import React, { useState } from "react";
import "../index.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");

  const navigate = useNavigate();

  const registerUser = async (e) => {
    e.preventDefault();

    // const options = {
    //   method: "post",
    //   url: ,
    //   data: ,
    //   ,
    // };

    try {
      console.log(email, password, fullName);
      await axios
        .post(
          "http://localhost:3000/api/users",
          JSON.stringify({
            UserName: fullName,
            Email: email,
            Password: password,
            ProfileImg: "default",
          }),
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then(
          ({ data }) => {
            if (data.data !== null) {
              setEmail("");
              setFullName("");
              setPassword("");
              navigate("/login");
            }
          },
          (err) => {
            console.log(err);
          }
        );
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="p-5 d-flex  justify-content-center ">
      <div
        className="col-md-4 shadow mt-5 bg-light"
        style={{ height: "600px", borderRadius: "40px" }}
      >
        <h1 className="text-center my-4">Register Here !</h1>
        <form className="mx-5 px-5" onSubmit={registerUser}>
          <div className="mb-3">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              onChange={(e) => {
                setFullName(e.target.value);
              }}
              value={fullName}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Email address</label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
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
              id="exampleInputPassword1"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              value={password}
            />
          </div>
          <h6 className="text-end mb-4">Forgot password ?</h6>
          <button type="submit" className="btn btn-primary fw-bold w-100">
            Register
          </button>

          <p className="text-center mt-5 fw-bold">
            Existing customer ? <Link to={"/login"}>Login</Link>{" "}
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;
