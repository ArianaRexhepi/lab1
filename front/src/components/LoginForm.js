import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setUser } from "../redux/actions/index";
import { toast } from "react-toastify";

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
    }).then(async (response) => {
      await response.json().then((result) => {
        if (result.token) {
          localStorage.setItem("token", result.token);
          dispatch(setUser(result));
        }
      });

      if (response.ok) {
        console.log("Login successful");
      } else {
        console.error("Login failed");
        toast.error("Wrong Username and Password");
      }
    });
  };

  return (
    <div className="container-modern" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="card-modern fade-in" style={{ maxWidth: '450px', width: '100%' }}>
        <div className="card-modern-header" style={{ textAlign: 'center' }}>
          <h3 className="mb-0">Log in</h3>
          {/* <p className="text-muted mb-0">Sign in to your BookHub account</p> */}
        </div>
        <div className="card-modern-body">
          <form onSubmit={login}>
            <div className="form-group-modern">
              <label className="form-label-modern">Email Address</label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-control-modern"
                required
              />
            </div>
            
            <div className="form-group-modern">
              <label className="form-label-modern">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-control-modern"
                required
              />
            </div>
            
            <button type="submit" className="btn-modern w-100" style={{ marginTop: '1rem' }}>
              Sign In
            </button>
            
            <div className="text-center mt-4">
              <p className="text-muted">
                Don't have an account?{' '}
                <Link to="/register" className="text-gradient" style={{ textDecoration: 'none', fontWeight: '600' }}>
                  Create one here
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop:"120px",
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
