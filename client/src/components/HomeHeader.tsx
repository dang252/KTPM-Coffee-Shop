import { BsTelephone } from "react-icons/bs";
import { CiLocationOn } from "react-icons/ci";

const HomeHeader = () => {
  return (
    <div className="h-[50px] flex flex-col md:flex-row gap-5 md:justify-center items-center md:gap-24 py-3">
      <div className="flex items-center gap-1">
        <CiLocationOn className="text-2xl text-[#e57905]" />
        <p className="text-[13px]">149 Cửa hàng khắp cả nước</p>
      </div>
      <div className="flex items-center gap-1">
        <BsTelephone className="text-xl text-[#e57905]" />
        <p className="text-[13px]">Đặt hàng: 1800.6936</p>
      </div>
    </div>
  );
};

export default HomeHeader;
