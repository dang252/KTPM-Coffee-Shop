import { useEffect } from "react";
import HomeCard from "./HomeCard";
import { getProductsByCategories } from "../redux/reducers/product.reducer";
import { useAppDispatch } from "../redux/hooks/hooks";
import { toast } from "react-toastify";
import { RootState } from "../redux/store";
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";

const HomeContent = () => {
  const dispathAsync = useAppDispatch();
  // const [products, setProducts] = useState<any>([]);
  useEffect(() => {
    const getProducts = async () => {
      try {
        await dispathAsync(getProductsByCategories(["bestseller"]));
        // console.log("data", data)
        // console.log("payload", data.payload)
        // setProducts(data?.payload)
      } catch (error: any) {
        console.log(error);
        toast.error("Can't get products try again later!");
      }
    };
    getProducts();
  }, [dispathAsync]);
  const products = useSelector<RootState, any>(
    (state) => state.product.productList
  );
  // useEffect(() => {
  //   console.log(products)
  // }, [products])
  return (
    <div
      className="w-[95%] mx-auto mt-[350px] md:mt-[630px] mb-[100px] flex justify-center flex-wrap gap-10 
                xl:max-w-[1300px] md:justify-start md:items-center md:flex-row"
    >
      <div className="w-[100%] md:w-[600px] md:h-[350px] flex">
        <img src="./assets/content1.png" className="w-[100%] rounded-md" />
      </div>
      {products &&
        products.map((product: any) => {
          const uid = uuidv4();

          return <HomeCard key={uid} product={product} />;
        })}
    </div>
  );
};

export default HomeContent;
