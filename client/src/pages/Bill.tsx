import { useEffect } from "react";

import OrderNav from "../components/OrderNav";
import BillContent from "../components/BillContent";
import HomeFooter from "../components/HomeFooter";

const Bill = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "The Coffee House - Thanh toán thành công";
  }, []);

  return (
    <div className="flex flex-col">
      <OrderNav />
      <BillContent />
      <HomeFooter />
    </div>
  );
};

export default Bill;
