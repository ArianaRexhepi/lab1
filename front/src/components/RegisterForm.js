import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setUser } from "../redux/actions/index";
import axios from "axios";
import { toast } from "react-toastify";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmpassword: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const state = useSelector((state) => state);

  useEffect(() => {
    if (state.user) {
      navigate("/");
    }
  }, [state.user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (formData.username.trim().includes(" ")) {
      toast.error("Username must not contain white spaces");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Invalid email format");
      return;
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    if (!passwordRegex.test(formData.password)) {
      toast.error(
        "Password must be at least 6 characters and contain both upper and lower case letters"
      );
      return;
    }

    if (formData.password !== formData.confirmpassword) {
      toast.error("Password and Confirm Password do not match!");
      return;
    }

    // API call
    const obj = {
      username: formData.username,
      email: formData.email,
      password: formData.password,
    };

    axios
      .post("http://localhost:5267/api/account/register", obj)
      .then((response) => {
        const result = response.data;
        if (response.status === 200 || response.status === 201) {
          localStorage.setItem("token", result.token);
          dispatch(setUser(result));
          toast.success("Registration successful!");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error("Registration failed. Try again.");
      });
  };

  return (
    <div
      className="container-modern"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div className="card-modern fade-in" style={{ maxWidth: "450px", width: "100%" }}>
        <div className="card-modern-header" style={{ textAlign: "center" }}>
          <h3 className="mb-0">Create Account</h3>
        </div>
        <div className="card-modern-body">
          <form onSubmit={handleSubmit}>
            <div className="form-group-modern">
              <label className="form-label-modern">Username</label>
              <input
                type="text"
                name="username"
                placeholder="Enter your username"
                value={formData.username}
                onChange={handleChange}
                className="form-control-modern"
                required
              />
            </div>

            <div className="form-group-modern">
              <label className="form-label-modern">Email Address</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                className="form-control-modern"
                required
              />
            </div>

            <div className="form-group-modern">
              <label className="form-label-modern">Password</label>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                className="form-control-modern"
                required
              />
            </div>

            <div className="form-group-modern">
              <label className="form-label-modern">Confirm Password</label>
              <input
                type="password"
                name="confirmpassword"
                placeholder="Confirm your password"
                value={formData.confirmpassword}
                onChange={handleChange}
                className="form-control-modern"
                required
              />
            </div>

            <button
              type="submit"
              className="btn-modern w-100"
              style={{ marginTop: "1rem" }}
            >
              Register
            </button>

            <div className="text-center mt-4">
              <p className="text-muted">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-gradient"
                  style={{ textDecoration: "none", fontWeight: "600" }}
                >
                  Log in here
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
