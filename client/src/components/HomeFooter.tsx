import { BsTelephone } from "react-icons/bs";
import { CiLocationOn } from "react-icons/ci";

const HomeFooter = () => {
  return (
    <div className="w-[100%] mt-[250px] md:mt-[50px] bg-[#000000D9] text-white">
      <div
        className="w-[95%] pt-10 pb-5 mx-auto flex justify-between flex-wrap gap-10 
                md:max-w-[70%] md:flex-row"
      >
        <div className="text-sm">
          <p className="mb-5 font-bold">Giới thiệu</p>
          <div className="flex flex-col gap-3">
            <p>Về chúng tôi</p>
            <p>Sản phẩm</p>
            <p>Khuyến mãi</p>
            <p>Chuyện cà phê</p>
            <p>Cửa Hàng</p>
            <p>Tuyển dụng</p>
          </div>
        </div>
        <div className="text-sm">
          <p className="mb-5 font-bold">Điều khoản</p>
          <div className="flex flex-col gap-3">
            <p>Điều khoản sử dụng</p>
            <p>Chính sách bảo mật thông tin</p>
            <p>Hướng dẫn xuất hóa đơn GTGT</p>
          </div>
        </div>
        <div className="text-sm md:max-w-[200px]">
          <div className="flex flex-col gap-10">
            <div className="flex gap-5">
              <BsTelephone className="text-xl" />
              <p className="font-bold">Đặt hàng: 1800 6936</p>
            </div>
            <div className="flex gap-5">
              <CiLocationOn className="text-xl" />
              <p className="font-bold">Liên hệ</p>
            </div>
            <p>
              Tầng 3-4 Hub Building 195/10E Điện Biên Phủ, P.15, Q.Bình Thạnh,
              TP.Hồ Chí Minh
            </p>
          </div>
        </div>
        <div className="text-sm">
          <iframe
            src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FThe.Coffee.House.2014%2F%3Fref%3Dembed_page&tabs=timeline&width=340&height=70&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId"
            width="340"
            height="150"
            style={{ border: "none", overflow: "hidden" }}
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
          ></iframe>
        </div>
      </div>
      <div className="w-[95%] h-[1px] bg-white mx-auto md:max-w-[70%]"></div>
      <div className="w-[95%] py-5 mx-auto md:max-w-[70%] text-[12px]">
        <p>Công ty cổ phần thương mại dịch vụ Trà Cà Phê VN</p>
        <p>
          Mã số DN: 0312867172 do sở kế hoạch và đầu tư tp. HCM cấp ngày
          23/07/2014. Người đại diện: NGÔ NGUYÊN KHA
        </p>
        <p>
          Địa chỉ: 86-88 Cao Thắng, phường 04, quận 3, tp Hồ Chí Minh Điện
          thoại: (028) 7107 8079 Email: hi@thecoffeehouse.vn
        </p>
        <p>
          © 2014-2022 Công ty cổ phần thương mại dịch vụ Trà Cà Phê VN mọi quyền
          bảo lưu
        </p>
      </div>
    </div>
  );
};

export default HomeFooter;
