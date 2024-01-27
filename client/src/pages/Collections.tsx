import { useEffect, useState } from "react";
import { Empty } from "antd";
import { v4 as uuidv4 } from "uuid";

import { useParams, Link } from "react-router-dom";

import { useAppDispatch } from "../redux/hooks/hooks";
import { getAllProducts } from "../redux/reducers/product.reducer";

import HomeCard from "../components/HomeCard";

const Collections = () => {
  const [title, setTitle] = useState<string>("");
  const [productsByCate, setProductsByCate] = useState<any[]>([]);

  const dispathAsync = useAppDispatch();

  const params = useParams();
  const { category } = params;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const handleGetAllProduct = async () => {
      console.log(category);

      const res = await dispathAsync(getAllProducts());

      console.log(res.payload);

      switch (category) {
        case "all": {
          setProductsByCate(res.payload);
          break;
        }
        case "coffee": {
          setProductsByCate(
            res.payload.filter((product: any) => {
              return product?.product?.categories.includes("coffee");
            })
          );
          break;
        }
        case "tea": {
          setProductsByCate(
            res.payload.filter((product: any) => {
              return product?.product?.categories.includes("tea");
            })
          );
          break;
        }
        case "hi-tea": {
          setProductsByCate(
            res.payload.filter((product: any) => {
              return product?.product?.categories.includes("hi-tea");
            })
          );
          break;
        }
        case "cloud": {
          setProductsByCate(
            res.payload.filter((product: any) => {
              return product?.product?.categories.includes("cloud");
            })
          );
          break;
        }
        case "tra-xanh": {
          setProductsByCate(
            res.payload.filter((product: any) => {
              return product?.product?.categories.includes("matcha");
            })
          );
          break;
        }
        case "da-xay": {
          setProductsByCate(
            res.payload.filter((product: any) => {
              return product?.product?.categories.includes("ice-blended");
            })
          );
          break;
        }
        case "snack": {
          setProductsByCate(
            res.payload.filter((product: any) => {
              return product?.product?.categories.includes("food");
            })
          );
          break;
        }
        case "thuong-thuc-tai-nha": {
          setProductsByCate(
            res.payload.filter((product: any) => {
              return product?.product?.categories.includes("packed");
            })
          );
          break;
        }
        default: {
          setProductsByCate([]);
        }
      }
      // if (category === "all") setProductsByCate(res.payload);
      // else if (category === "coffee")
      //   setProductsByCate(
      //     res.payload.filter((product: any) => {
      //       return product?.product?.categories.includes("coffee");
      //     })
      //   );
      // else setProductsByCate([]);
    };

    handleGetAllProduct();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);

  useEffect(() => {
    if (category === "all") {
      document.title = "Tất cả sản phẩm - The Coffee House";
      setTitle("Tất cả sản phẩm");
    }
    if (category === "coffee") {
      document.title = "Cà phê - The Coffee House";
      setTitle("Cà phê");
    }
    if (category === "tea") {
      document.title = "Trà - The Coffee House";
      setTitle("Trà");
    }
    if (category === "cloud") {
      document.title = "Cloud - The Coffee House";
      setTitle("Cloud");
    }
    if (category === "hi-tea") {
      document.title = "Hi tea - The Coffee House";
      setTitle("Hi tea");
    }
    if (category === "tra-xanh") {
      document.title = "Trà xanh - The Coffee House";
      setTitle("Trà xanh");
    }
    if (category === "da-xay") {
      document.title = "Thức uống đá xay - The Coffee House";
      setTitle("Thức uống đá xây");
    }
    if (category === "snack") {
      document.title = "Bánh - The Coffee House";
      setTitle("Bánh & Snack");
    }
    if (category === "thuong-thuc-tai-nha") {
      document.title = "Thưởng thức tại nhà - The Coffee House";
      setTitle("Thưởng thức tại nhà");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  return (
    <div className="mt-[100px] w-[95%] mx-auto mb-[100px] flex justify-center gap-10 md:mt-[50px]">
      <div className="hidden xl:flex flex-col gap-5">
        <Link
          to="/collections/all"
          className={`hover:cursor-pointer ${category === "all" && "text-[#e57905] font-bold"
            }`}
        >
          Tất Cả
        </Link>
        <Link
          to="/collections/coffee"
          className={`hover:cursor-pointer ${category === "coffee" && "text-[#e57905] font-bold"
            }`}
        >
          Cà Phê
        </Link>
        <Link
          to="/collections/tea"
          className={`hover:cursor-pointer ${category === "tea" && "text-[#e57905] font-bold"
            }`}
        >
          Trà
        </Link>
        <Link
          to="/collections/cloud"
          className={`hover:cursor-pointer ${category === "cloud" && "text-[#e57905] font-bold"
            }`}
        >
          Cloud
        </Link>
        <Link
          to="/collections/hi-tea"
          className={`hover:cursor-pointer ${category === "hi-tea" && "text-[#e57905] font-bold"
            }`}
        >
          Hi-Tea Healthy
        </Link>
        <Link
          to="/collections/tra-xanh"
          className={`hover:cursor-pointer ${category === "tra-xanh" && "text-[#e57905] font-bold"
            }`}
        >
          Trà Xanh - Sô cô la
        </Link>
        <Link
          to="/collections/da-xay"
          className={`hover:cursor-pointer ${category === "da-xay" && "text-[#e57905] font-bold"
            }`}
        >
          Thức uống đá xay
        </Link>
        <Link
          to="/collections/snack"
          className={`hover:cursor-pointer ${category === "snack" && "text-[#e57905] font-bold"
            }`}
        >
          Bánh & Snack
        </Link>
        <Link
          to="/collections/thuong-thuc-tai-nha"
          className={`hover:cursor-pointer ${category === "thuong-thuc-tai-nha" && "text-[#e57905] font-bold"
            }`}
        >
          Thưởng Thức Tại Nhà
        </Link>
      </div>
      <div className="w-[100%] md:max-w-[1000px] md:border-l-2 md:border-gray-200 md:pl-14">
        <p className="font-bold text-2xl mb-8">{title}</p>
        <div className="flex flex-wrap gap-10">
          {productsByCate?.length === 0 && (
            <div className="mt-[100px] w-[100%] flex flex-col gap-3 items-center">
              <p className="font-bold">Không có sản phẩm thỏa yêu cầu</p>
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            </div>
          )}

          {productsByCate?.map((product) => {
            const uid = uuidv4();
            return <HomeCard key={uid} product={product} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Collections;
