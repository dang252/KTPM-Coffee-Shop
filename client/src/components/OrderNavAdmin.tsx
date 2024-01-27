import { Link, useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useAppDispatch } from "../redux/hooks/hooks";
import { logoutAccount } from "../redux/reducers/user.reducer";
import { toast } from "react-toastify";

const OrderNavAdmin = () => {

  const id = useSelector<RootState, number>(
    (state) => state.persisted.users.userId
  );

  const dispathAsync = useAppDispatch();
  const navigate = useNavigate();

  const logout = async (id: number) => {
    try {
      await dispathAsync(logoutAccount(id));
      toast.success("Logout successfully!");
      navigate("/")
    } catch (error) {
      toast.error("Can't login! try again later");
    }
  };

  return (
    <div
      className="fixed z-20 w-[100%] flex flex-col md:flex-row gap-10 justify-around items-center py-[15px]"
      style={{
        background:
          "radial-gradient(100% 501.4% at 0% 100%,#ffb141 0%,#fb8d17 100%)",
      }}
    >
      <Link to="/admin">
        <div className="w-[200px] flex content-center justify-center">
          <img
            className="w-[100%]"
            src="https://order.thecoffeehouse.com/_nuxt/img/logo.174bdfd.svg"
            alt="logo"
          />
          <div className="w-[200px] font-black text-white text-lg whitespace-nowrap ml-1"> | ADMIN</div>
        </div>
      </Link>
      <button
        className="text-sm border border-solid border-[#ff5353] p-2 rounded-md text-[#ff5353] ml-2
                          hover:bg-[#ff5353] hover:text-white"
        onClick={() => {
          const text = "Bạn có chắc muốn đăng xuất?";

          if (confirm(text) == true) {
            logout(id);
          }
        }}
      >
        Đăng xuất
      </button>
    </div>
  );
};

export default OrderNavAdmin;
