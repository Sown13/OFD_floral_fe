import React, { use, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import api from "../api/api";

function RegisterForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    try {
      const response = await api.post('/users/signup', { firstName, lastName, username, password, email, phone });
      console.log("register successfull", response.data);
      alert("Register Successfull");
    } catch (error) {
      if (error.response) {
        console.log("Error response:", error.response.data);
        alert(error.response.data.message || "Register Failed")
      } else {
        console.log("Error:", error);
        alert("Something went wrong");
      }
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow-lg" style={{ maxWidth: "400px", width: "100%" }}>
        <h3 className="text-center text-success">Register</h3>
        <form onSubmit={handleRegister}>

          <div className="row mb-2">
            <div className="col-6">
              <label className="form-label">First Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter First Name"
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>

            <div className="col-6">
              <label className="form-label">Last Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Last Name"
                required
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </div>


          <div className="mb-3">
            <label className="form-label">User Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter username"
              required
              value={username}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>

          <div className="row mb-2">
            <div className="col-6">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="col-6">
              <label className="form-label">Phone</label>
              <input
                type="tel"
                className="form-control"
                placeholder="Enter phone"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Confirm Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Confirm password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <div className="form-check mb-3">
            <input
              type="checkbox"
              className="form-check-input"
              id="terms"
              required
              checked={acceptedTerms}
              onChange={(e) => setAcceptedTerms(e.target.checked)}
            />
            <label className="form-check-label" htmlFor="terms">
              I Accept Terms & Conditions
            </label>
          </div>

          <button type="submit" className="btn btn-success w-100">
            Register
          </button>
        </form>
        <p className="text-center mt-3">
          Already have an account? <a href="#login" className="text-success">Login</a>
        </p>
      </div>
    </div>
  );
}

export default RegisterForm;
