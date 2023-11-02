import HomeHeader from "../components/HomeHeader";
import HomeNav from "../components/HomeNav";
import HomeNavMobile from "../components/HomeNavMobile";
import HomeCarousel from "../components/HomeCarousel";

const Home = () => {
  return (
    <div className="flex flex-col">
      <HomeHeader />
      <HomeNav />
      <HomeNavMobile />
      <HomeCarousel />
    </div>
  );
};

export default Home;
