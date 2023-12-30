import { useEffect, useState } from "react";

import { useParams, Link } from "react-router-dom";


const Collections = () => {
  const [title, setTitle] = useState<string>("");
  const params = useParams();
  const { category } = params;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
          {/* <HomeCard />
          <HomeCard />
          <HomeCard />
          <HomeCard /> */}
        </div>
      </div>
    </div>
  );
};

export default Collections;
