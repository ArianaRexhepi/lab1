import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setUser } from "../redux/actions/index";
import { toast } from 'react-toastify';

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const state = useSelector((state) => state);

  useEffect(() => {
    if (state.user) {
      navigate("/");
    }
  }, [state.user]);

  const login = (e) => {
    e.preventDefault();
    const requestBody = {
      email: email,
      password: password,
    };

    fetch("http://localhost:5267/api/account/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify(requestBody),
    }).then((response) => {
      let token = null;
      let result = null;
      response.json().then((result) => {
        token = result.token;
        result = result;
      });

      if (response.ok) {
        console.log("Login successful");
        localStorage.setItem("token", token);
        dispatch(setUser(result));
      } else {
        console.error("Login failed");
        toast.error("Wrong Username and Password");
      }
    });
  };

  return (
    <div style={styles.container}>
      <div style={styles.box}>
        {<h1>Log in</h1>}

        <form onSubmit={login} style={styles.form}>
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
          />
          <br />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
          />
          <br />
          <button type="submit" style={styles.button}>
            Sign In
          </button>
          <div style={styles.linksContainer}>
            <Link to="/register" style={{ textDecoration: "none" }}>
              Not a member? Create an account
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "95vh",
  },
  box: {
    width: "600px",
    height: "500px",
    padding: "20px",
    borderRadius: "4px",
    backgroundColor: "white",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "left",
  },
  input: {
    padding: "10px",
    marginBottom: "10px",
    width: "100%",
    border: "1px solid #ccc",
  },
  button: {
    padding: "10px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    cursor: "pointer",
    width: "100%",
  },
  linksContainer: {
    display: "flex",
    marginRight: "310px",
    marginTop: "10px",
  },
  link: {
    marginRight: "10px",
    color: "#065fd4",
    textDecoration: "none",
    cursor: "pointer",
  },
};

export default LoginForm;
