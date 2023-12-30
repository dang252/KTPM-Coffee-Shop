import { Link } from "react-router-dom";

const HomeCard = (props: { product: any }) => {
  const { product } = { ...props }
  return (
    <div className="flex flex-col w-[180px] xl:w-[280px] md:h-[350px]">
      <Link to={`/product/${product.product.productId}`}>
        <img
          src={product.productImage}
          className="w-[100%] shadow-md rounded-md"
          alt="product"
        />
      </Link>
      <div className="flex flex-col mt-5">
        <Link to="/">
          <p className="text-[16px] font-bold mb-[2px] hover:text-[#e57905]">
            {product.product.productName}
          </p>
        </Link>
        <p className="text-[15px] font-thin text-gray-600">{product.product.productPrice}</p>
      </div>
    </div >
  );
};

export default HomeCard;
