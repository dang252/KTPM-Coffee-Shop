import { useEffect } from "react";

import OrderNav from "../components/OrderNav";
import OrderTable from "../components/OrderTable";
import HomeFooter from "../components/HomeFooter";

const Order = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "The Coffee House - Giỏ hàng";
  }, []);

  return (
    <div className="flex flex-col">
      <OrderNav />
      <OrderTable />
      <HomeFooter />
    </div>
  );
};

export default Order;
