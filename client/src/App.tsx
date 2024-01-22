import { Routes, Route } from "react-router-dom";

import "./App.css";

import { axiosAuthRequest, axiosAuthResponse } from "./config/axios";
import { ToastContainer } from "react-toastify";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./redux/store";
import { useSocket } from "./hooks/useSocket";
import { SendHandshake, StartListeners } from "./helpers/socket";

import Home from "./pages/Home";
import Order from "./pages/Order";
import Bill from "./pages/Bill";
import History from "./pages/History";
import Admin from "./pages/Admin";

const App = () => {
  axiosAuthRequest;
  axiosAuthResponse;
  const dispatch = useDispatch();
  const username = useSelector<RootState, string>(
    (state) => state.persisted.users.username
  );
  const id = useSelector<RootState, number>(
    (state) => state.persisted.users.userId
  );

  const socket = useSocket(import.meta.env.VITE_API_URL, {
    autoConnect: false,
  });

  useEffect(() => {
    if (id && username) {
      socket.connect();
      dispatch({ type: "update_socket", payload: socket });

      // Listen event to socket
      StartListeners(socket, dispatch);

      // Send event to socket
      SendHandshake(socket, username, id);
    }
  }, [dispatch, id, socket, username]);

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
        <Route path="/bill/:orderId" element={<Bill />} />
        <Route path="/history/:userId" element={<History />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </>
  );
};

export default App;
