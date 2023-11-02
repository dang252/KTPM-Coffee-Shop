import { useState, useLayoutEffect, useRef } from "react";

import { Drawer } from "@material-tailwind/react";

import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { BsCaretDownFill } from "react-icons/bs";

import { Link } from "react-router-dom";

const HomeNavMobile = () => {
  const nav = useRef<any>();

  const [open, setOpen] = useState(false);

  const openDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);

  useLayoutEffect(() => {
    const divAnimate = nav.current.getBoundingClientRect().top;

    const onScroll = () => {
      if (divAnimate < window.scrollY) {
        nav.current.style.position = "fixed";
        nav.current.style.top = 0;
        nav.current.style.left = 0;
      } else {
        nav.current.style.position = "relative";
        nav.current.style.top = "50px";
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <Drawer open={open} onClose={closeDrawer} className="p-4">
        <div className="mb-6 flex items-center justify-between">
          <div className="text-xl hover:cursor-pointer" onClick={closeDrawer}>
            <AiOutlineClose />
          </div>
        </div>
        <Link to="/" className="w-[100%] flex flex-col">
          <div className="py-4 border-t-2 border-b-2 border-sky-500">
            <p className="font-semibold">Cà phê</p>
          </div>
        </Link>
        <Link to="/" className="w-[100%] flex flex-col">
          <div className="py-4 border-b-2 border-sky-500">
            <p className="font-semibold">Trà</p>
          </div>
        </Link>
        <Link to="/" className="w-[100%] flex flex-col">
          <div className="py-4 border-b-2 border-sky-500 flex justify-between">
            <p className="font-semibold">Menu</p>
            <BsCaretDownFill />
          </div>
        </Link>
        <Link to="/" className="w-[100%] flex flex-col">
          <div className="py-4 border-b-2 border-sky-500 flex justify-between">
            <p className="font-semibold">Chuyện nhà</p>
            <BsCaretDownFill />
          </div>
        </Link>
        <Link to="/" className="w-[100%] flex flex-col">
          <div className="py-4 border-b-2 border-sky-500">
            <p className="font-semibold">Cảm hứng CloudFee</p>
          </div>
        </Link>
        <Link to="/" className="w-[100%] flex flex-col">
          <div className="py-4 border-b-2 border-sky-500">
            <p className="font-semibold">Cửa hàng</p>
          </div>
        </Link>
        <Link to="/" className="w-[100%] flex flex-col">
          <div className="py-4 border-b-2 border-sky-500">
            <p className="font-semibold">Tuyển dụng</p>
          </div>
        </Link>
      </Drawer>
      <div
        ref={nav}
        className="w-[100%] px-3 bg-white bg-opacity-80 fixed flex justify-between items-center md:hidden top-[100px] z-20 bg-red-500"
      >
        <div onClick={openDrawer} className="hover:cursor-pointer">
          <AiOutlineMenu className="text-2xl" />
        </div>
        <Link to="/">
          <img
            src="./assets/logo.png"
            alt="logo"
            className="w-[180px] hover:cursor-pointer"
          />
        </Link>
        <div></div>
      </div>
    </>
  );
};

export default HomeNavMobile;
