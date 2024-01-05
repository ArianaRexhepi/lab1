import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setUser } from "../redux/actions/index";
import axios from "axios";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmpassword: "",
  });
  const [error, setError] = useState("");
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

    // Validate username: No white spaces
    if (formData.username.trim().includes(" ")) {
      setError("Username must not contain white spaces");
      return;
    }

    // Validate email: Valid format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Invalid email format");
      return;
    }

    // Validate password: 6 characters containing upper and lower case letters
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    if (!passwordRegex.test(formData.password)) {
      setError(
        "Password must be at least 6 characters and contain both upper and lower case letters"
      );
      return;
    }

    if (formData.password !== formData.confirmpassword) {
      setError("Password and Confirm Password do not match!");
    } else {
      const obj = {
        username: formData.username,
        email: formData.email,
        password: formData.password,
      };

       axios
        .post("http://localhost:5267/api/account/register", obj)
        .then((response) => {
          const result = response.data;

          if (response.status === 200) {
            console.log("Register successful");
            localStorage.setItem("token", result.token);
            dispatch(setUser(result));
          } else {
            console.error("Register failed");
          }
        })
        .catch((error) => {
          console.log("Error:", error);
        });

      setError("");
    }
  };



  return (
    <div className="register-form">
      <h2>Registration Form</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />
        <input
          type="password"
          name="confirmpassword"
          placeholder="Confirm Password"
          value={formData.confirmpassword}
          onChange={handleChange}
        />
        <p>{error}</p>
        <button type="submit">Register</button>
        <div style={styles.linksContainer}>
          <Link to="/login" style={{ textDecoration: "none" }}>
            Already a member? Log in
          </Link>
        </div>
      </form>
    </div>
  );
};

const styles = {
  linksContainer: {
    display: "flex",
    marginRight: "210px",
    marginTop: "10px",
  },
  link: {
    marginRight: "10px",
    color: "#065fd4",
    textDecoration: "none",
    cursor: "pointer",
  },
};

export default RegisterForm;
