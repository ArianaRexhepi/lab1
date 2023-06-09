import "./App.css";
import Pages from "./components/Pages";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "./redux/actions/index";
import { ToastContainer } from "react-toastify";
import axios from "axios";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    const token = window.localStorage.getItem("token");
    setLoading(true);
    if (token) {
      await axios
        .get("http://localhost:5267/api/account")
        .then((res) => dispatch(setUser(res.data)))
        .catch((err) => {
          setLoading(false);
          console.log(err);
        });
    }
    setLoading(false);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      <Pages />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
}

export default App;
