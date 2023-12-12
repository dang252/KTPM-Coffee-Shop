import Modal from "react-modal";
import { useForm, SubmitHandler } from "react-hook-form";

import { IoMdClose } from "react-icons/io";

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
    maxHeight: "80vh",
  },
};

type FormInput = {
  username: string;
  password: string;
  confirm: string;
  email: string;
  phone: string;
  fullname: string;
};

interface PropType {
  openRegisterModal: boolean;
  setOpenRegisterModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const RegisterForm = (props: PropType) => {
  const { openRegisterModal, setOpenRegisterModal } = props;

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<FormInput>();

  const closeModal = () => {
    setOpenRegisterModal(false);
  };

  const onSubmit: SubmitHandler<FormInput> = (data) => {
    console.log(data);
  };

  return (
    <Modal
      isOpen={openRegisterModal}
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
          Đăng Ký Tài Khoản
        </p>

        <div className="h-[100px] flex flex-col gap-3 min-w-[300px]">
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

        <div className="h-[100px] flex flex-col gap-3 min-w-[300px]">
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

        <div className="h-[100px] flex flex-col gap-3 min-w-[300px]">
          <p className="font-semibold text-md">Xác nhận mật khẩu:</p>
          <input
            type="password"
            placeholder="Nhập xác nhận mật khẩu..."
            className="p-2 rounded-md border-2 border-solid border-[#e57905] focus:outline-0"
            {...register("confirm", {
              required: true,
              validate: (value) => {
                const { password } = getValues();
                return password === value || "Mật khẩu không khớp!";
              },
            })}
          />
          {errors.confirm && (
            <p className="text-sm text-red-500">Vui lòng xác nhận mật khẩu</p>
          )}
        </div>

        <div className="h-[100px] flex flex-col gap-3 min-w-[300px]">
          <p className="font-semibold text-md">Họ và tên:</p>
          <input
            type="text"
            placeholder="Nhập họ tên..."
            className="p-2 rounded-md border-2 border-solid border-[#e57905] focus:outline-0"
            {...register("fullname", { required: true })}
          />
          {errors.fullname && (
            <p className="text-sm text-red-500">Vui lòng nhập họ tên</p>
          )}
        </div>

        <div className="h-[100px] flex flex-col gap-3 min-w-[300px]">
          <p className="font-semibold text-md">Email:</p>
          <input
            type="email"
            placeholder="Nhập email..."
            className="p-2 rounded-md border-2 border-solid border-[#e57905] focus:outline-0"
            {...register("email", { required: true })}
          />
          {errors.email && (
            <p className="text-sm text-red-500">Vui lòng nhập email</p>
          )}
        </div>

        <div className="h-[100px] flex flex-col gap-3 min-w-[300px]">
          <p className="font-semibold text-md">Số điện thoại:</p>
          <input
            type="text"
            placeholder="Nhập số điện thoại..."
            className="p-2 rounded-md border-2 border-solid border-[#e57905] focus:outline-0"
            {...register("phone", { required: true })}
          />
          {errors.phone && (
            <p className="text-sm text-red-500">Vui lòng nhập số điện thoại</p>
          )}
        </div>

        <button
          type="submit"
          className="mt-10 bg-[#e57905] text-white p-2 rounded-md"
        >
          Đăng ký
        </button>
      </form>
    </Modal>
  );
};

export default RegisterForm;
