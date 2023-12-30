import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Order from "./pages/Order";
import "./App.css";
import { axiosAuthRequest, axiosAuthResponse } from "./config/axios";
import { ToastContainer } from "react-toastify";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./redux/store";
import { useSocket } from "./hooks/useSocket";
import { SendHandshake, StartListeners } from "./helpers/socket";

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
  }, [dispatch, id, socket, username])

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
