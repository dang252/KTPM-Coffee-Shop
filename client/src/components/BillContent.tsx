import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Card, Typography } from "@material-tailwind/react";
import { v4 as uuidv4 } from "uuid";

import { useDispatch } from "react-redux";
import { useAppDispatch } from "../redux/hooks/hooks";
import { getDetailBill } from "../redux/reducers/product.reducer";

const TABLE_HEAD = ["Tên sản phẩm", "Số lượng", "Size", "Topping", "Giá"];

const BillContent = () => {
  const [detailBill, setDetailBill] = useState<any>(null);

  const navigate = useNavigate();

  const params = useParams();
  const { orderId } = params;

  const dispath = useDispatch();
  const dispatchAsync = useAppDispatch();

  const handleGetBillDetail = async () => {
    const res = await dispatchAsync(getDetailBill(Number(orderId)));
    setDetailBill(res.payload);

    console.log(res);
  };

  useEffect(() => {
    handleGetBillDetail();
    dispath({ type: "products/updateCart", payload: [] }); // Reset cart
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="w-[95%] xl:max-w-[1200px] min-h-[400px] z-10 mx-auto mt-[300px] md:mt-[150px] mb-[100px]">
      <div className="w-[100%] p-6">
        <svg
          viewBox="0 0 24 24"
          className="text-green-600 w-16 h-16 mx-auto my-6"
        >
          <path
            fill="currentColor"
            d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"
          />
        </svg>
        <p className="text-center text-[30px] font-bold">
          Thanh toán thành công
        </p>

        <div className="mt-10 flex flex-col gap-8 text-[18px]">
          <p>Mã đơn hàng: {detailBill?.orderId}</p>
          <p>Địa chỉ nhận hàng: {detailBill?.shippingInfoAddress}</p>
          <p>Số điện thoại nhạn hàng: {detailBill?.shippingInfoPhone}</p>
          <p>Trạng thái đơn hàng: {detailBill?.status}</p>
          <p>Thành tiền: {detailBill?.totalPrice}đ</p>
          <div>
            <p className="font-semibold">Sản phẩm:</p>
            <Card className="my-5 overflow-x-auto">
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
                  {detailBill?.details?.map(
                    (
                      {
                        productName,
                        quantity,
                        size,
                        toppingList,
                        productOriginPrice,
                      }: any,
                      index: number
                    ) => {
                      const uid = uuidv4();

                      const isLast = index === detailBill?.details?.length - 1;
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
                              {productName}
                            </Typography>
                          </td>
                          <td className={classes}>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {quantity}
                            </Typography>
                          </td>
                          <td className={classes}>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {size}
                            </Typography>
                          </td>
                          <td className={classes}>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {toppingList?.length === 0 && <p>Không có</p>}
                              {toppingList?.map((topping: any) => {
                                const uid2 = uuidv4();

                                return <p key={uid2}>{topping.toppingName}</p>;
                              })}
                            </Typography>
                          </td>
                          <td className={classes}>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {productOriginPrice}đ
                            </Typography>
                          </td>
                        </tr>
                      );
                    }
                  )}
                </tbody>
              </table>
            </Card>
          </div>
          <Button
            className="self-end w-[120px]"
            color="green"
            onClick={() => {
              navigate("/");
            }}
          >
            Đồng ý
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BillContent;
