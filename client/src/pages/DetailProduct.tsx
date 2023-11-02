import { useEffect } from "react";

import { Link } from "react-router-dom";

import HomeCardSmall from "../components/HomeCardSmall";

const DetailProduct = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "CloudFee Hạnh Nhân Nướng";
  }, []);

  return (
    <div
      className="mt-[100px] w-[95%] mx-auto mb-[100px] flex justify-center flex-wrap gap-10 
          md:mt-[50px] md:max-w-[80%] xl:max-w-[55%] md:justify-start md:items-center md:flex-row"
    >
      <div className="flex flex-wrap gap-3 text-sm">
        <Link to="/" className="hover:cursor-pointer hover:text-[#e57905]">
          Menu
        </Link>
        <p>/</p>
        <Link to="/" className="hover:cursor-pointer hover:text-[#e57905]">
          Sản phẩm hot trang chủ
        </Link>
        <p>/</p>
        <p className="font-bold text-gray-500">
          CloudFee Creamy Hạnh Nhân Nướng
        </p>
      </div>
      <div className="w-[100%] flex flex-col gap-10 md:flex-row justify-between">
        <div className="w-[100%] md:w-[50%]">
          <img src="../assets/coffee1.png" />
        </div>
        <div className="w-[100%] md:w-[50%] mt-10 md:mt-0">
          <div className="flex flex-col gap-3">
            <p className="font-bold text-2xl">CloudFee Hạnh Nhân Nướng</p>
            <p className="font-bold text-2xl text-[#e57905]">49.000 đ</p>
          </div>
        </div>
      </div>
      <div className="w-[100%] h-[1px] bg-gray-200"></div>
      <div className="flex flex-col">
        <p className="font-bold">Mô tả sản phẩm</p>
        <p className="text-justify mt-3">
          Vị đắng nhẹ từ cà phê phin truyền thống kết hợp Espresso Ý, lẫn chút
          ngọt ngào của kem sữa và lớp foam trứng cacao, nhấn thêm hạnh nhân
          nướng thơm bùi, kèm topping thạch cà phê dai giòn mê ly. Tất cả cùng
          quyện hoà trong một thức uống làm vị giác "thức giấc", thơm ngon hết
          nấc.
        </p>
      </div>
      <div className="w-[100%] h-[1px] bg-gray-200"></div>
      <div className="flex flex-col">
        <p className="font-bold">Sản phẩm liên quan</p>
        <div className="flex flex-wrap gap-5 mt-5">
          <HomeCardSmall />
          <HomeCardSmall />
          <HomeCardSmall />
          <HomeCardSmall />
          <HomeCardSmall />
        </div>
      </div>
    </div>
  );
};

export default DetailProduct;
