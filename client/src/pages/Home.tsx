import HomeHeader from "../components/HomeHeader";
import HomeNav from "../components/HomeNav";
import HomeCarousel from "../components/HomeCarousel";

const Home = () => {
  return (
    <div className="flex flex-col">
      <HomeHeader />
      <HomeNav />
      <HomeCarousel />
    </div>
  );
};

export default Home;
