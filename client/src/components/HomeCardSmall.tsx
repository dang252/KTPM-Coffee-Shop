import { Link } from "react-router-dom";

interface PropType {
  product: any;
}

const HomeCardSmall = (props: PropType) => {
  const { product } = props;

  return (
    <div className="flex flex-col w-[180px] md:h-[300px]">
      <Link to={`/product/${product?.product?.productId}`}>
        <img
          // src="../assets/coffee1.png"
          src={product?.productImage}
          className="w-[100%] shadow-md rounded-md"
          alt="product"
        />
      </Link>
      <div className="flex flex-col mt-5">
        <Link to="/">
          <p className="text-[16px] font-bold mb-[2px] hover:text-[#e57905]">
            {product?.product?.productName}
          </p>
        </Link>
        <p className="text-[15px] font-thin text-gray-600">
          {product?.product?.productPrice} đ
        </p>
      </div>
    </div>
  );
};

export default HomeCardSmall;
