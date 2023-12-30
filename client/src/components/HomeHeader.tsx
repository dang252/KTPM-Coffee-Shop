import { useState } from "react";

import { BsTelephone } from "react-icons/bs";
import { CiLocationOn } from "react-icons/ci";
import { ShoppingCartOutlined } from "@ant-design/icons";

import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { logoutAccount } from "../redux/reducers/user.reducer";
import { useAppDispatch } from "../redux/hooks/hooks";

import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import NotiDropdown from "./NotiDropdown";

const HomeHeader = () => {
  const [openLoginModal, setOpenLoginModal] = useState<boolean>(false);
  const [openRegisterModal, setOpenRegisterModal] = useState<boolean>(false);

  const navigate = useNavigate();

  const username = useSelector<RootState, string>(
    (state) => state.persisted.users.username
  );
  const id = useSelector<RootState, number>(
    (state) => state.persisted.users.userId
  );
  const dispathAsync = useAppDispatch();

  const logout = async (id: number) => {
    try {
      await dispathAsync(logoutAccount(id));
      toast.success("Logout successfully!");
    } catch (error) {
      toast.error("Can't login! try again later");
    }
  };
  return (
    <div className="h-[50px] flex items-center flex-wrap gap-5 justify-around">
      <LoginForm
        openLoginModal={openLoginModal}
        setOpenLoginModal={setOpenLoginModal}
      />

      <RegisterForm
        openRegisterModal={openRegisterModal}
        setOpenRegisterModal={setOpenRegisterModal}
      />

      <div className="flex flex-wrap items-center gap-5">
        <Link to="/">
          <div className="flex items-center gap-1 hover:text-[#e57905]">
            <CiLocationOn className="text-2xl text-[#e57905]" />
            <p className="text-[13px]">149 Cửa hàng khắp cả nước</p>
          </div>
        </Link>
        <Link to="/">
          <div className="flex items-center gap-1 hover:text-[#e57905]">
            <BsTelephone className="text-xl text-[#e57905]" />
            <p className="text-[13px]">Đặt hàng: 1800.6936</p>
          </div>
        </Link>
      </div>

      {username == "" ? (
        <div className="flex items-center gap-5">
          <button
            className="bg-[#e57905] text-sm text-white p-2 rounded-md"
            onClick={() => {
              setOpenLoginModal(true);
            }}
          >
            Đăng nhập
          </button>
          <button
            className="text-sm border border-solid border-[#e57905] p-2 rounded-md text-[#e57905]
                          hover:bg-[#e57905] hover:text-white"
            onClick={() => {
              setOpenRegisterModal(true);
            }}
          >
            Đăng ký
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-5">
          Xin chào, {username}
          <NotiDropdown />
          <ShoppingCartOutlined
            className="text-2xl hover:cursor-pointer hover:text-blue-500"
            onClick={() => {
              navigate(`/history/${id}`);
            }}
          />
          <button
            className="text-sm border border-solid border-[#ff5353] p-2 rounded-md text-[#ff5353] ml-2
                          hover:bg-[#ff5353] hover:text-white"
            onClick={() => {
              logout(id);
            }}
          >
            Đăng xuất
          </button>
        </div>
      )}
    </div>
  );
};

export default HomeHeader;
