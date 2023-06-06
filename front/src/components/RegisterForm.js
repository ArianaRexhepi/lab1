import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setUser } from "../redux/actions/index";

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
    if (formData.password !== formData.confirmpassword) {
      setError("Password and Confirm Password do not match!");
    } else {
      const obj = {
        username: formData.username,
        email: formData.email,
        password: formData.password,
      };
      fetch("http://localhost:5267/api/account/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
        body: JSON.stringify(obj),
      }).then((response) => {
        console.log(response);
        response.json().then((result) => {
          localStorage.setItem("token", result.token);
          dispatch(setUser(result));
        });

        if (response.ok) {
          console.log("Register successful");
        } else {
          console.error("Register failed");
        }
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
          placeholder=" Full Name"
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
