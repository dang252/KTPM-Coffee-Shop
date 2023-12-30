import Modal from "react-modal";
import { useForm, SubmitHandler } from "react-hook-form";

import { IoMdClose } from "react-icons/io";
import { UserAccount } from "../types/user";
import { loginAccount } from "../redux/reducers/user.reducer";
import { toast } from "react-toastify";
import { useAppDispatch } from "../redux/hooks/hooks";

const customStyles = {
  overlay: {
    zIndex: 100,
    backgroundColor: "rgba(70, 70, 70, 0.8)",
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

type FormInput = {
  username: string;
  password: string;
};

interface PropType {
  openLoginModal: boolean;
  setOpenLoginModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const LoginForm = (props: PropType) => {
  const { openLoginModal, setOpenLoginModal } = props;
  const dispathAsync = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInput>();

  const closeModal = () => {
    setOpenLoginModal(false);
  };

  const onSubmit: SubmitHandler<FormInput> = async (data) => {
    try {
      const userAccount: UserAccount = {
        username: data.username,
        password: data.password,
      };

      await dispathAsync(loginAccount(userAccount)).unwrap();
      toast.success("Login successfully");
      setOpenLoginModal(false);
    } catch (err) {
      console.log("login failed", err);
      toast.error("Login failed! please try again later");
    }
  };

  return (
    <Modal
      isOpen={openLoginModal}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Login Modal"
      ariaHideApp={false}
    >
      <form
        className="w-[100%] md:w-[500px] flex flex-col gap-5 px-6"
        onSubmit={handleSubmit(onSubmit)}
      >
        <button className="self-end" onClick={closeModal}>
          <IoMdClose size={25} />
        </button>

        <p className="text-2xl text-center font-black text-[#e57905]">
          Đăng Nhập
        </p>

        <div className="h-[120px] flex flex-col gap-3 min-w-[300px]">
          <p className="font-semibold text-md">Tên đăng nhập:</p>
          <input
            type="text"
            placeholder="Nhập tên đăng nhập..."
            className="p-2 rounded-md border-2 border-solid border-[#e57905] focus:outline-0"
            {...register("username", { required: true })}
          />
          {errors.username && (
            <p className="text-sm text-red-500">Vui lòng nhập tên tài khoản</p>
          )}
        </div>

        <div className="h-[120px] flex flex-col gap-3 min-w-[300px]">
          <p className="font-semibold text-md">Mật khẩu:</p>
          <input
            type="password"
            placeholder="Nhập mật khẩu..."
            className="p-2 rounded-md border-2 border-solid border-[#e57905] focus:outline-0"
            {...register("password", { required: true })}
          />
          {errors.password && (
            <p className="text-sm text-red-500">Vui lòng mật khẩu</p>
          )}
        </div>

        <button
          type="submit"
          className="bg-[#e57905] text-white p-2 rounded-md"
        >
          Đăng nhập
        </button>
      </form>
    </Modal>
  );
};

export default LoginForm;
