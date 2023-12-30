import { useEffect, useState } from "react";
import HomeCard from "./HomeCard";
import { getProductsByCategories } from "../redux/reducers/product.reducer";
import { useAppDispatch } from "../redux/hooks/hooks";
import { toast } from "react-toastify";
import { Product } from "../types/product";

const HomeContent = () => {
  const dispathAsync = useAppDispatch();
  const [products, setProducts] = useState<any>([]);
  useEffect(() => {
    const getProducts = async () => {
      try {
        const data = await dispathAsync(getProductsByCategories(["bestseller"]))
        // console.log("data", data)
        // console.log("payload", data.payload)
        setProducts(data?.payload)
      }
      catch (error: any) {
        console.log(error)
        toast.error("Can't get products try again later!");
      }
    }
    getProducts()

  }, [dispathAsync])
  useEffect(() => {
    console.log(products)
  }, [products])
  return (
    <div
      className="w-[95%] mx-auto mt-[350px] md:mt-[630px] mb-[100px] flex justify-center flex-wrap gap-10 
                xl:max-w-[1300px] md:justify-start md:items-center md:flex-row"
    >
      <div className="w-[100%] md:w-[600px] md:h-[350px] flex">
        <img src="./assets/content1.png" className="w-[100%] rounded-md" />
      </div>
      {products && products.map((product: Product) => {
        return <HomeCard product={product} />
      })}
    </div>
  );
};

export default HomeContent;
