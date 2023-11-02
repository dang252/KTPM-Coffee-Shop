import { useLayoutEffect, useRef } from "react";

import { BsCaretDownFill } from "react-icons/bs";

import { Link } from "react-router-dom";

import "./HomeNav.css";

const HomeNav = () => {
  const nav = useRef<any>();

  useLayoutEffect(() => {
    const divAnimate = nav.current.getBoundingClientRect().top;

    const onScroll = () => {
      if (divAnimate < window.scrollY) {
        nav.current.style.position = "fixed";
        nav.current.style.top = 0;
        nav.current.style.left = 0;
      } else {
        nav.current.style.position = "relative";
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      ref={nav}
      className="hidden relative z-20 bg-white bg-opacity-80 md:flex w-[100%] h-[60px] items-center justify-center gap-16"
    >
      <Link to="/">
        <img
          src="../assets/logo.png"
          alt="logo"
          className="w-[230px] hover:cursor-pointer"
        />
      </Link>
      <div className="flex gap-12">
        <Link to="/">
          <p className="text-[14px] font-semibold hover:cursor-pointer hover:text-[#e57905]">
            Cà phê
          </p>
        </Link>
        <Link to="/">
          <p className="text-[14px] font-semibold hover:cursor-pointer hover:text-[#e57905]">
            Trà
          </p>
        </Link>
        <div className="menu">
          <Link to="/">
            <div className="relative flex items-center gap-2 hover:cursor-pointer hover:text-[#e57905]">
              <p className="text-[14px] font-semibold">Menu</p>
              <BsCaretDownFill className="text-[8px]" />
            </div>
          </Link>
          <div className="menu-dropdown invisible group-hover:visible px-[50px] py-5 absolute w-[100%] left-0 top-[30px] flex flex-wrap gap-[60px] justify-center">
            <Link to="/collections/all">
              <div className="sub-menu text-left text-[16px] hover:cursor-pointer hover:text-[#e57905]">
                <p className="pr-[50px] font-bold">Tất Cả</p>
                <p className="sub-menu-underline bg-black w-[100%] h-[3px]"></p>
              </div>
            </Link>
            <div className="flex flex-col gap-2">
              <Link to="/collections/coffee">
                <div className="sub-menu mb-3 text-left text-[16px] hover:cursor-pointer hover:text-[#e57905]">
                  <p className="pr-[50px] font-bold">Cà Phê</p>
                  <p className="sub-menu-underline bg-black w-[100%] h-[3px]"></p>
                </div>
              </Link>
              <Link to="/">
                <div className="sub-menu text-left text-[16px] hover:cursor-pointer hover:text-[#e57905]">
                  <p className="text-sm text-gray-500 hover:text-[#e57905]">
                    Cà Phê Hightlight
                  </p>
                </div>
              </Link>
              <Link to="/">
                <div className="sub-menu text-left text-[16px] hover:cursor-pointer hover:text-[#e57905]">
                  <p className="text-sm text-gray-500 hover:text-[#e57905]">
                    Cà Phê Việt Nam
                  </p>
                </div>
              </Link>
              <Link to="/">
                <div className="sub-menu text-left text-[16px] hover:cursor-pointer hover:text-[#e57905]">
                  <p className="text-sm text-gray-500 hover:text-[#e57905]">
                    Cà Phê Máy
                  </p>
                </div>
              </Link>
              <Link to="/">
                <div className="sub-menu text-left text-[16px] hover:cursor-pointer hover:text-[#e57905]">
                  <p className="text-sm text-gray-500 hover:text-[#e57905]">
                    Cold Brew
                  </p>
                </div>
              </Link>
            </div>
            <div className="flex flex-col gap-2">
              <Link to="/collections/tea">
                <div className="sub-menu mb-3 text-left text-[16px] hover:cursor-pointer hover:text-[#e57905]">
                  <p className="pr-[50px] font-bold">Trà</p>
                  <p className="sub-menu-underline bg-black w-[100%] h-[3px]"></p>
                </div>
              </Link>
              <Link to="/">
                <div className="sub-menu text-left text-[16px] hover:cursor-pointer hover:text-[#e57905]">
                  <p className="text-sm text-gray-500 hover:text-[#e57905]">
                    Trà Trái Cây
                  </p>
                </div>
              </Link>
              <Link to="/">
                <div className="sub-menu text-left text-[16px] hover:cursor-pointer hover:text-[#e57905]">
                  <p className="text-sm text-gray-500 hover:text-[#e57905]">
                    Trà Sữa
                  </p>
                </div>
              </Link>
              <Link to="/">
                <div className="sub-menu text-left text-[16px] hover:cursor-pointer hover:text-[#e57905]">
                  <p className="text-sm text-gray-500 hover:text-[#e57905]">
                    Macchiato
                  </p>
                </div>
              </Link>
            </div>
            <div className="flex flex-col gap-2">
              <Link to="/collections/cloud">
                <div className="sub-menu mb-3 text-left text-[16px] hover:cursor-pointer hover:text-[#e57905]">
                  <p className="pr-[50px] font-bold">Cloud</p>
                  <p className="sub-menu-underline bg-black w-[100%] h-[3px]"></p>
                </div>
              </Link>
              <Link to="/">
                <div className="sub-menu text-left text-[16px] hover:cursor-pointer hover:text-[#e57905]">
                  <p className="text-sm text-gray-500 hover:text-[#e57905]">
                    CloudTea
                  </p>
                </div>
              </Link>
              <Link to="/">
                <div className="sub-menu text-left text-[16px] hover:cursor-pointer hover:text-[#e57905]">
                  <p className="text-sm text-gray-500 hover:text-[#e57905]">
                    CloudFee
                  </p>
                </div>
              </Link>
            </div>
            <div className="flex flex-col gap-2">
              <Link to="/collections/hi-tea">
                <div className="sub-menu mb-3 text-left text-[16px] hover:cursor-pointer hover:text-[#e57905]">
                  <p className="pr-[50px] font-bold">Hi-Tea Healthy</p>
                  <p className="sub-menu-underline bg-black w-[100%] h-[3px]"></p>
                </div>
              </Link>
              <Link to="/">
                <div className="sub-menu text-left text-[16px] hover:cursor-pointer hover:text-[#e57905]">
                  <p className="text-sm text-gray-500 hover:text-[#e57905]">
                    Hi-Tea Trà
                  </p>
                </div>
              </Link>
              <Link to="/">
                <div className="sub-menu text-left text-[16px] hover:cursor-pointer hover:text-[#e57905]">
                  <p className="text-sm text-gray-500 hover:text-[#e57905]">
                    Hi-Tea Đá
                  </p>
                </div>
              </Link>
              <Link to="/">
                <div className="sub-menu text-left text-[16px] hover:cursor-pointer hover:text-[#e57905]">
                  <p className="text-sm text-gray-500 hover:text-[#e57905]">
                    Tuyết
                  </p>
                </div>
              </Link>
            </div>
            <div className="flex flex-col gap-2">
              <Link to="/collections/tra-xanh">
                <div className="sub-menu mb-3 text-left text-[16px] hover:cursor-pointer hover:text-[#e57905]">
                  <p className="pr-[50px] font-bold">Trà Xanh - Sô cô la</p>
                  <p className="sub-menu-underline bg-black w-[100%] h-[3px]"></p>
                </div>
              </Link>
              <Link to="/">
                <div className="sub-menu text-left text-[16px] hover:cursor-pointer hover:text-[#e57905]">
                  <p className="text-sm text-gray-500 hover:text-[#e57905]">
                    Trà Xanh Tây Bắc
                  </p>
                </div>
              </Link>
              <Link to="/">
                <div className="sub-menu text-left text-[16px] hover:cursor-pointer hover:text-[#e57905]">
                  <p className="text-sm text-gray-500 hover:text-[#e57905]">
                    Sô cô la
                  </p>
                </div>
              </Link>
            </div>
            <div className="flex flex-col gap-2">
              <Link to="/collections/da-xay">
                <div className="sub-menu mb-3 text-left text-[16px] hover:cursor-pointer hover:text-[#e57905]">
                  <p className="pr-[50px] font-bold">Thức uống đá xay</p>
                  <p className="sub-menu-underline bg-black w-[100%] h-[3px]"></p>
                </div>
              </Link>
              <Link to="/">
                <div className="sub-menu text-left text-[16px] hover:cursor-pointer hover:text-[#e57905]">
                  <p className="text-sm text-gray-500 hover:text-[#e57905]">
                    Đá xay Frosty
                  </p>
                </div>
              </Link>
            </div>
            <div className="flex flex-col gap-2">
              <Link to="/collections/snack">
                <div className="sub-menu mb-3 text-left text-[16px] hover:cursor-pointer hover:text-[#e57905]">
                  <p className="pr-[50px] font-bold">Bánh & Snack</p>
                  <p className="sub-menu-underline bg-black w-[100%] h-[3px]"></p>
                </div>
              </Link>
              <Link to="/">
                <div className="sub-menu text-left text-[16px] hover:cursor-pointer hover:text-[#e57905]">
                  <p className="text-sm text-gray-500 hover:text-[#e57905]">
                    Bánh mặn
                  </p>
                </div>
              </Link>
              <Link to="/">
                <div className="sub-menu text-left text-[16px] hover:cursor-pointer hover:text-[#e57905]">
                  <p className="text-sm text-gray-500 hover:text-[#e57905]">
                    Bánh ngọt
                  </p>
                </div>
              </Link>
              <Link to="/">
                <div className="sub-menu text-left text-[16px] hover:cursor-pointer hover:text-[#e57905]">
                  <p className="text-sm text-gray-500 hover:text-[#e57905]">
                    Snack
                  </p>
                </div>
              </Link>
              <Link to="/">
                <div className="sub-menu text-left text-[16px] hover:cursor-pointer hover:text-[#e57905]">
                  <p className="text-sm text-gray-500 hover:text-[#e57905]">
                    Bánh Pastry
                  </p>
                </div>
              </Link>
            </div>
            <div className="flex flex-col gap-2">
              <Link to="/collections/thuong-thuc-tai-nha">
                <div className="sub-menu mb-3 text-left text-[16px] hover:cursor-pointer hover:text-[#e57905]">
                  <p className="pr-[50px] font-bold">Thưởng Thức Tại Nhà</p>
                  <p className="sub-menu-underline bg-black w-[100%] h-[3px]"></p>
                </div>
              </Link>
              <Link to="/">
                <div className="sub-menu text-left text-[16px] hover:cursor-pointer hover:text-[#e57905]">
                  <p className="text-sm text-gray-500 hover:text-[#e57905]">
                    Cà phê tại nhà
                  </p>
                </div>
              </Link>
              <Link to="/">
                <div className="sub-menu text-left text-[16px] hover:cursor-pointer hover:text-[#e57905]">
                  <p className="text-sm text-gray-500 hover:text-[#e57905]">
                    Trà tại nhà
                  </p>
                </div>
              </Link>
            </div>
          </div>
        </div>
        <div className="menu">
          <Link to="/">
            <div className="relative flex items-center gap-2 hover:cursor-pointer hover:text-[#e57905]">
              <p className="text-[14px] font-semibold">Chuyện Nhà</p>
              <BsCaretDownFill className="text-[8px]" />
            </div>
          </Link>
          <div className="menu-dropdown invisible group-hover:visible px-[50px] py-5 opacity-0 absolute w-[100%] left-0 top-[30px] flex flex-wrap gap-[60px] justify-center">
            <div className="flex flex-col gap-2">
              <Link to="/">
                <div className="sub-menu mb-3 text-left text-[16px] hover:cursor-pointer hover:text-[#e57905]">
                  <p className="pr-[200px] font-bold">Coffeeholic</p>
                  <p className="sub-menu-underline bg-black w-[100%] h-[3px]"></p>
                </div>
              </Link>
              <Link to="/">
                <div className="sub-menu text-left text-[16px] hover:cursor-pointer hover:text-[#e57905]">
                  <p className="text-sm text-gray-500 hover:text-[#e57905]">
                    #chuyencaphe
                  </p>
                </div>
              </Link>
              <Link to="/">
                <div className="sub-menu text-left text-[16px] hover:cursor-pointer hover:text-[#e57905]">
                  <p className="text-sm text-gray-500 hover:text-[#e57905]">
                    #phacaphe
                  </p>
                </div>
              </Link>
            </div>
            <div className="flex flex-col gap-2">
              <Link to="/">
                <div className="sub-menu mb-3 text-left text-[16px] hover:cursor-pointer hover:text-[#e57905]">
                  <p className="pr-[200px] font-bold">Teaholic</p>
                  <p className="sub-menu-underline bg-black w-[100%] h-[3px]"></p>
                </div>
              </Link>
              <Link to="/">
                <div className="sub-menu text-left text-[16px] hover:cursor-pointer hover:text-[#e57905]">
                  <p className="text-sm text-gray-500 hover:text-[#e57905]">
                    #phatra
                  </p>
                </div>
              </Link>
              <Link to="/">
                <div className="sub-menu text-left text-[16px] hover:cursor-pointer hover:text-[#e57905]">
                  <p className="text-sm text-gray-500 hover:text-[#e57905]">
                    #cauchuyenvetra
                  </p>
                </div>
              </Link>
            </div>
            <div className="flex flex-col gap-2">
              <Link to="/">
                <div className="sub-menu mb-3 text-left text-[16px] hover:cursor-pointer hover:text-[#e57905]">
                  <p className="pr-[200px] font-bold">Blog</p>
                  <p className="sub-menu-underline bg-black w-[100%] h-[3px]"></p>
                </div>
              </Link>
              <Link to="/">
                <div className="sub-menu text-left text-[16px] hover:cursor-pointer hover:text-[#e57905]">
                  <p className="text-sm text-gray-500 hover:text-[#e57905]">
                    #inthemood
                  </p>
                </div>
              </Link>
              <Link to="/">
                <div className="sub-menu text-left text-[16px] hover:cursor-pointer hover:text-[#e57905]">
                  <p className="text-sm text-gray-500 hover:text-[#e57905]">
                    #Review
                  </p>
                </div>
              </Link>
              <Link to="/">
                <div className="sub-menu text-left text-[16px] hover:cursor-pointer hover:text-[#e57905]">
                  <p className="text-sm text-gray-500 hover:text-[#e57905]">
                    #HumanofTCH
                  </p>
                </div>
              </Link>
            </div>
          </div>
        </div>
        <Link to="/">
          <p className="text-[14px] font-semibold hover:cursor-pointer hover:text-[#e57905]">
            Cảm hứng CloudFee
          </p>
        </Link>
        <Link to="/">
          <p className="text-[14px] font-semibold hover:cursor-pointer hover:text-[#e57905]">
            Cửa hàng
          </p>
        </Link>
        <Link to="/">
          <p className="text-[14px] font-semibold hover:cursor-pointer hover:text-[#e57905]">
            Tuyển dụng
          </p>
        </Link>
      </div>
    </div>
  );
};

export default HomeNav;
