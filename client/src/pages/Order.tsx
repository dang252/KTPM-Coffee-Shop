import OrderNav from "../components/OrderNav";
import OrderTable from "../components/OrderTable";
import HomeFooter from "../components/HomeFooter";

const Order = () => {
  return (
    <div className="flex flex-col">
      <OrderNav />
      <OrderTable />
      <HomeFooter />
    </div>
  );
};

export default Order;
