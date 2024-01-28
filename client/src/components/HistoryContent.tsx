import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Card, Typography } from "@material-tailwind/react";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import { Empty } from "antd";

import { useAppDispatch } from "../redux/hooks/hooks";
import { getUserBillHistory } from "../redux/reducers/product.reducer";

import { formatDay } from "../helpers";

const TABLE_HEAD = [
  "Mã đơn hàng",
  "Địa chỉ nhận hàng",
  "Số điện thoại nhận hàng",
  "Ngày mua",
  "Thành tiền",
];

const HistoryContent = () => {
  const [billList, setbillList] = useState<any[]>([]);

  const navigate = useNavigate();

  const params = useParams();
  const { userId } = params;

  const dispatchAsync = useAppDispatch();

  const handleGetBillDetail = async () => {
    try {
      const res = await dispatchAsync(getUserBillHistory(Number(userId))).unwrap();
      setbillList(res.payload);

      console.log(res);
    } catch (error) {
      toast.error("Lấy lịch sử mua hàng thất bại");
    }
  };

  useEffect(() => {
    handleGetBillDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="w-[95%] xl:max-w-[1300px] min-h-[400px] z-10 mx-auto mt-[300px] md:mt-[150px] mb-[100px] flex flex-col">
      <p className="text-center text-[30px] font-bold">Lịch sử mua hàng</p>
      {billList?.length === 0 && (
        <div className="mt-[100px] w-[100%] flex flex-col gap-3 items-center">
          <p className="font-bold">Bạn chưa có đơn hàng nào</p>
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
        </div>
      )}

      {billList?.length !== 0 && (
        <Card className="my-5">
          <table className="w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th
                    key={head}
                    className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                  >
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal leading-none opacity-70"
                    >
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {billList?.map(
                (
                  {
                    orderId,
                    shippingInfoAddress,
                    shippingInfoPhone,
                    updatedAt,
                    totalPrice,
                  }: any,
                  index: number
                ) => {
                  const uid = uuidv4();

                  const isLast = index === billList?.length - 1;
                  const classes = isLast
                    ? "p-4"
                    : "p-4 border-b border-blue-gray-50";

                  return (
                    <tr key={uid}>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {orderId}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {shippingInfoAddress}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {shippingInfoPhone}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {formatDay(updatedAt)}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {totalPrice}đ
                        </Typography>
                      </td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
        </Card>
      )}

      <Button
        color="green"
        className="w-[100px] self-end"
        onClick={() => {
          navigate("/");
        }}
      >
        Quay lại
      </Button>
    </div>
  );
};

export default HistoryContent;
