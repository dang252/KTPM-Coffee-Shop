import { useEffect } from "react";

import OrderNav from "../components/OrderNav";
import HistoryContent from "../components/HistoryContent";
import HomeFooter from "../components/HomeFooter";

const History = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "The Coffee House - Thanh toán thành công";
  }, []);

  return (
    <div className="flex flex-col">
      <OrderNav />
      <HistoryContent />
      <HomeFooter />
    </div>
  );
};

export default History;
