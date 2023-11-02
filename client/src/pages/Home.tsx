import { Routes, Route } from "react-router-dom";

import HomeHeader from "../components/HomeHeader";
import HomeNav from "../components/HomeNav";
import HomeNavMobile from "../components/HomeNavMobile";
import HomeCarousel from "../components/HomeCarousel";
import HomeContent from "../components/HomeContent";
import DetailProduct from "./DetailProduct";
import HomeBanner from "../components/HomeBanner";
import HomeFooter from "../components/HomeFooter";

const Home = () => {
  return (
    <div className="flex flex-col">
      <HomeHeader />
      <HomeNav />
      <HomeNavMobile />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <HomeCarousel />
              <HomeContent />
              <HomeBanner />
            </>
          }
        />
        <Route path="/detail/:1" element={<DetailProduct />} />
      </Routes>
      <HomeFooter />
    </div>
  );
};

export default Home;
