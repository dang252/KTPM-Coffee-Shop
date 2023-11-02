import { Link } from "react-router-dom";

const HomeBanner = () => {
  return (
    <div
      className="relative w-[95%] mx-auto mb-[100px] flex justify-center flex-wrap gap-10 
            md:max-w-[70%] md:justify-start md:items-center md:flex-row"
    >
      <img src="./assets/homebanner.png" />
      <div className="absolute w-[100%] flex flex-col items-center md:right-0 md:w-[50%]">
        <img src="./assets/greentea.png" alt="greentea" className="w-[50%]" />
        <p className="w-[90%] md:w-[80%] mt-10 text-justify">
          Được trồng trọt và chăm chút kỹ lưỡng, nuôi dưỡng từ thổ nhưỡng phì
          nhiêu, nguồn nước mát lành, bao bọc bởi mây và sương cùng nền nhiệt độ
          mát mẻ quanh năm, những búp trà ở Tây Bắc mập mạp và xanh mướt, hội tụ
          đầy đủ dưỡng chất, sinh khí, và tinh hoa đất trời.Chính khí hậu đặc
          trưng cùng phương pháp canh tác của đồng bào dân tộc nơi đây đã tạo ra
          Trà Xanh vị mộc dễ uống, dễ yêu, không thể trộn lẫn với bất kỳ vùng
          miền nào khác.
        </p>
        <Link
          to="/"
          className="w-[90%] md:w-[80%] text-white text-center bg-[#778B37] mt-10 rounded-md py-2"
        >
          Thử ngay
        </Link>
      </div>
    </div>
  );
};

export default HomeBanner;
