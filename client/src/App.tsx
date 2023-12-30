import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Order from "./pages/Order";
import "./App.css";
import { axiosAuthRequest, axiosAuthResponse } from "./config/axios";
import { ToastContainer } from "react-toastify";

const App = () => {
  axiosAuthRequest;
  axiosAuthResponse;
  return (
    <>
      <ToastContainer
        position="bottom-left"
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
      <Routes>
        <Route path="*" element={<Home />} />
        <Route path="/order" element={<Order />} />
      </Routes>
    </>
  );
};

export default App;
