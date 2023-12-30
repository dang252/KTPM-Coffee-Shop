import { useEffect } from "react";

import { Routes, Route } from "react-router-dom";

import HomeHeader from "../components/HomeHeader";
import HomeNav from "../components/HomeNav";
import HomeNavMobile from "../components/HomeNavMobile";
import HomeCarousel from "../components/HomeCarousel";
import HomeContent from "../components/HomeContent";
import HomeBanner from "../components/HomeBanner";
import HomeFooter from "../components/HomeFooter";

import DetailProduct from "./DetailProduct";
import Collections from "./Collections";

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "The Coffee House - Deliver 1800 6936";
  }, []);

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
        <Route path="/product/:id" element={<DetailProduct />} />
        <Route path="/collections/:category" element={<Collections />} />
      </Routes>
      <HomeFooter />
    </div>
  );
};

export default Home;
