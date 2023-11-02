import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Order from "./pages/Order";
import "./App.css";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/order" element={<Order />} />
    </Routes>
  );
};

export default App;
