import { Carousel } from "@material-tailwind/react";

const HomeCarousel = () => {
  return (
    <Carousel
      className="absolute z-10 mt-[100px] md:mt-[53px] w-[100%] h-[560px]"
      autoplay={true}
      loop={true}
      navigation={({ setActiveIndex, activeIndex, length }) => (
        <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
          {new Array(length).fill("").map((_, i) => (
            <span
              key={i}
              className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
                activeIndex === i ? "w-6 bg-[#e57905]" : "w-6 bg-white/50"
              }`}
              onClick={() => setActiveIndex(i)}
            />
          ))}
        </div>
      )}
    >
      <img
        src="./assets/Home Banner/banner1.png"
        alt="banner 1"
        className="h-full w-full object-cover"
      />
      <img
        src="./assets/Home Banner/banner2.png"
        alt="banner 2"
        className="h-full w-full object-cover"
      />
      <img
        src="./assets/Home Banner/banner3.png"
        alt="banner 4"
        className="h-full w-full object-cover"
      />
      <img
        src="./assets/Home Banner/banner4.png"
        alt="banner 4"
        className="h-full w-full object-cover"
      />
      <img
        src="./assets/Home Banner/banner5.png"
        alt="banner 5"
        className="h-full w-full object-cover"
      />
    </Carousel>
  );
};

export default HomeCarousel;
