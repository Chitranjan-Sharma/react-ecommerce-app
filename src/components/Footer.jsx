import React from "react";

function Footer() {
  return (
    <div className="bg-light mt-5" style={{ marginTop: "auto" }}>
      <div className="container d-flex justify-content-evenly pt-5">
        <div>
          <h6 className="fw-bold">Links</h6>

          <p>LinkedIN</p>
          <p>Facebook</p>
        </div>
        <div>
          <h6 className="fw-bold">Contact Us</h6>

          <p>+91 1234567890</p>
          <p>Noida, Uttar Pradesh</p>
        </div>
      </div>
      <hr />
      <p className="text-center pb-4">Powered by @Chitranjan Sharma</p>
    </div>
  );
}

export default Footer;
