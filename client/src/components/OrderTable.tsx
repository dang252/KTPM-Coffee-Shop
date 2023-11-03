import { Button, Card, Typography } from "@material-tailwind/react";

import { v4 as uuidv4 } from "uuid";

// Reduc/redux-toolkit config import
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";

import OrderProductQuantity from "./OrderProductQuantity";

import { CartProduct } from "../types/product";
import { Link } from "react-router-dom";

const TABLE_HEAD = [
  "Tên sản phẩm",
  "Hình ảnh",
  "Size",
  "Số lượng",
  "Topping",
  "Giá tiền",
  "Thao tác",
];

const OrderTable = () => {
  const dispath = useDispatch();

  const cart = useSelector<RootState, CartProduct[]>(
    (state) => state.product.cart
  );

  return (
    <div
      className="w-[95%] z-10 mx-auto mt-[300px] md:mt-[150px] mb-[100px] flex justify-center flex-wrap gap-10 
                xl:max-w-[1300px] md:justify-start md:items-center md:flex-row"
    >
      <Card className="h-full w-full overflow-auto">
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
            {cart?.map(
              (
                { cart_id, product_id, name, size, quantity, topping, price },
                index
              ) => {
                const id = uuidv4();

                const isLast = index === cart?.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";

                return (
                  <tr key={id}>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal font-semibold"
                      >
                        {name}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Link to={`/product/${product_id}`}>
                        <div className="w-[100px]">
                          <img
                            className="w-[100%]"
                            src="../assets/coffee1.png"
                            alt="image"
                          />
                        </div>
                      </Link>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {size === "small" && "Nhỏ"}
                        {size === "medium" && "Vừa"}
                        {size === "large" && "Lớn"}
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
                      <div className="flex flex-col gap-3">
                        {topping &&
                          topping.map((top) => {
                            const id = uuidv4();
                            return (
                              <Typography
                                key={id}
                                variant="small"
                                color="blue-gray"
                                className="font-normal"
                              >
                                {top}
                              </Typography>
                            );
                          })}
                      </div>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {price} VNĐ
                      </Typography>
                    </td>
                    <td className={classes}>
                      <div className="flex gap-10">
                        {quantity !== undefined && (
                          <OrderProductQuantity
                            cart_id={cart_id}
                            quantity={quantity}
                          />
                        )}
                        <Button
                          color="red"
                          onClick={() => {
                            dispath({
                              type: "products/removeProductToCart",
                              payload: cart_id,
                            });
                          }}
                        >
                          Xóa sản phẩm
                        </Button>
                      </div>
                    </td>
                  </tr>
                );
              }
            )}
          </tbody>
        </table>
      </Card>
    </div>
  );
};

export default OrderTable;
