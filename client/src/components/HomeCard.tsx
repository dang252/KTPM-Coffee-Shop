import { Link } from "react-router-dom";

const HomeCard = () => {
  return (
    <div className="flex flex-col w-[180px] md:w-[280px] md:h-[350px]">
      <Link to="/detail/1">
        <img
          src="./assets/coffee1.png"
          className="w-[100%] shadow-md rounded-md"
          alt="product"
        />
      </Link>
      <div className="flex flex-col mt-5">
        <Link to="/">
          <p className="text-[16px] font-bold mb-[2px] hover:text-[#e57905]">
            CloudFee Hạnh Nhân Nướng
          </p>
        </Link>
        <p className="text-[15px] font-thin text-gray-600">49.000 đ</p>
      </div>
    </div>
  );
};

export default HomeCard;