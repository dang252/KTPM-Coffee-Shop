import { Link } from "react-router-dom";

import { AiOutlineUser } from "react-icons/ai";

import { CartProduct } from "../types/product";

// Reduc/redux-toolkit config import
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const OrderNav = () => {
  const cart = useSelector<RootState, CartProduct[]>((state) => state.product.cart);

  return (
    <div
      className="fixed z-20 w-[100%] flex flex-col md:flex-row gap-10 justify-around items-center py-[15px]"
      style={{
        background:
          "radial-gradient(100% 501.4% at 0% 100%,#ffb141 0%,#fb8d17 100%)",
      }}
    >
      <Link to="/order">
        <div className="w-[200px]">
          <img
            className="w-[100%]"
            src="https://order.thecoffeehouse.com/_nuxt/img/logo.174bdfd.svg"
            alt="logo"
          />
        </div>
      </Link>
      <div className="flex justify-center flex-wrap gap-10 text-white text-md font-semibold">
        <Link to="/">Trang chủ</Link>
        <Link to="/">Tin tức</Link>
        <Link to="/">Cửa hàng</Link>
        <Link to="/">Khuyến mãi</Link>
        <Link to="/">Tuyển dụng</Link>
      </div>
      <div className="flex gap-10">
        <div className="flex items-center gap-3 text-white font-semibold">
          <AiOutlineUser className="text-2xl" />
          <p>Lê Minh Trí</p>
        </div>
        <div className="relative">
          <div className="bg-white p-[10px] rounded-full">
            <img
              src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTgiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAxOCAyMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTE3IDIwSDFDMC43MzQ3ODQgMjAgMC40ODA0MyAxOS44OTQ2IDAuMjkyODkzIDE5LjcwNzFDMC4xMDUzNTcgMTkuNTE5NiAwIDE5LjI2NTIgMCAxOVYxQzAgMC43MzQ3ODQgMC4xMDUzNTcgMC40ODA0MyAwLjI5Mjg5MyAwLjI5Mjg5M0MwLjQ4MDQzIDAuMTA1MzU3IDAuNzM0Nzg0IDAgMSAwSDE3QzE3LjI2NTIgMCAxNy41MTk2IDAuMTA1MzU3IDE3LjcwNzEgMC4yOTI4OTNDMTcuODk0NiAwLjQ4MDQzIDE4IDAuNzM0Nzg0IDE4IDFWMTlDMTggMTkuMjY1MiAxNy44OTQ2IDE5LjUxOTYgMTcuNzA3MSAxOS43MDcxQzE3LjUxOTYgMTkuODk0NiAxNy4yNjUyIDIwIDE3IDIwWk0xNiAxOFYySDJWMThIMTZaTTYgNFY2QzYgNi43OTU2NSA2LjMxNjA3IDcuNTU4NzEgNi44Nzg2OCA4LjEyMTMyQzcuNDQxMjkgOC42ODM5MyA4LjIwNDM1IDkgOSA5QzkuNzk1NjUgOSAxMC41NTg3IDguNjgzOTMgMTEuMTIxMyA4LjEyMTMyQzExLjY4MzkgNy41NTg3MSAxMiA2Ljc5NTY1IDEyIDZWNEgxNFY2QzE0IDcuMzI2MDggMTMuNDczMiA4LjU5Nzg1IDEyLjUzNTUgOS41MzU1M0MxMS41OTc5IDEwLjQ3MzIgMTAuMzI2MSAxMSA5IDExQzcuNjczOTIgMTEgNi40MDIxNSAxMC40NzMyIDUuNDY0NDcgOS41MzU1M0M0LjUyNjc4IDguNTk3ODUgNCA3LjMyNjA4IDQgNlY0SDZaIiBmaWxsPSIjRkI5MTFDIi8+Cjwvc3ZnPgo="
              alt="cart"
            />
          </div>
          <div className="absolute right-[-15px] top-[-5px] bg-red-500 text-white rounded-full w-[1px] h-[1px] flex justify-center items-center p-3">
            <p className="text-sm">{cart?.length}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderNav;
