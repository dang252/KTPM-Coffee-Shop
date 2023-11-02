import HomeCard from "./HomeCard";

const HomeContent = () => {
  return (
    <div
      className="w-[95%] mx-auto mt-[630px] mb-[100px] flex justify-center flex-wrap gap-10 
                md:max-w-[70%] md:justify-start md:items-center md:flex-row"
    >
      <div className="w-[100%] md:w-[600px] md:h-[350px] flex">
        <img src="./assets/content1.png" className="w-[100%] rounded-md" />
      </div>
      <HomeCard />
      <HomeCard />
      <HomeCard />
      <HomeCard />
      <HomeCard />
      <HomeCard />
    </div>
  );
};

export default HomeContent;
