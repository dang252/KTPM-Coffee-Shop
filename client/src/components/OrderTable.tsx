import { useState, useEffect } from "react";

import { Button, Card, Typography } from "@material-tailwind/react";

import { v4 as uuidv4 } from "uuid";

// Reduc/redux-toolkit config import
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { RootState } from "../redux/store";

import { CartProduct } from "../types/product";

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
  const [cartTable, setCartTable] = useState<CartProduct[]>([]);
  const [checkChangeQuantity, setCheckChangeQuantity] =
    useState<boolean>(false);

  const dispath = useDispatch();

  const cart = useSelector<RootState, CartProduct[]>(
    (state) => state.product.cart
  );

  useEffect(() => {
    if (cart) setCartTable(cart);
  }, [cart]);

  const handleChangeQuantity = (
    type: string,
    cart_id: string,
    quantity: number
  ) => {
    if (type === "increase") {
      dispath({
        type: "products/increaseProductToCart",
        payload: {
          cart_id: cart_id,
          value: quantity + 1,
        },
      });
    }

    if (type === "decrease") {
      dispath({
        type: "products/decreaseProductToCart",
        payload: {
          cart_id: cart_id,
          value: quantity - 1,
        },
      });
    }

    setCartTable(cart);
  };

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
            {cartTable?.map(
              ({ cart_id, name, size, quantity, topping, price }, index) => {
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
                      <div className="w-[100px]">
                        <img
                          className="w-[100%]"
                          src="../assets/coffee1.png"
                          alt="image"
                        />
                      </div>
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
                        <div className="flex items-center gap-5">
                          <div
                            className={`w-[35px] h-[35px] flex items-center p-2 rounded-full hover:cursor-pointer ${
                              quantity !== undefined && quantity > 1
                                ? "bg-[#e57905]"
                                : "bg-gray-400"
                            }`}
                            onClick={() => {
                              if (quantity !== undefined && quantity > 1) {
                                handleChangeQuantity(
                                  "decrease",
                                  cart_id.toString(),
                                  quantity
                                );
                              }
                            }}
                          >
                            <img
                              className="w-[100%]"
                              src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMiIgdmlld0JveD0iMCAwIDE2IDIiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxNiIgaGVpZ2h0PSIyIiBmaWxsPSJ3aGl0ZSIvPgo8L3N2Zz4K"
                              alt="increase"
                            />
                          </div>
                          <p>{quantity}</p>
                          <div
                            className="w-[35px] h-[35px] flex items-center bg-[#e57905] p-2 rounded-full hover:cursor-pointer"
                            onClick={() => {
                              if (quantity !== undefined) {
                                handleChangeQuantity(
                                  "increase",
                                  cart_id.toString(),
                                  quantity
                                );
                              }
                            }}
                          >
                            <img
                              className="w-[100%]"
                              src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTYuODU3MTQgNi44NTcxNFYwSDkuMTQyODZWNi44NTcxNEgxNlY5LjE0Mjg2SDkuMTQyODZWMTZINi44NTcxNFY5LjE0Mjg2SDBWNi44NTcxNEg2Ljg1NzE0WiIgZmlsbD0id2hpdGUiLz4KPC9zdmc+Cg=="
                              alt="increase"
                            />
                          </div>
                        </div>
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
