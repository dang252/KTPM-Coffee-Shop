import { Button, Card, Typography, Input } from "@material-tailwind/react";

import { v4 as uuidv4 } from "uuid";
import * as CurrencyFormat from "react-currency-format";
import { Empty } from "antd";

// Reduc/redux-toolkit config import
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";

import OrderProductQuantity from "./OrderProductQuantity";

import { CartProduct } from "../types/product";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAppDispatch } from "../redux/hooks/hooks";
import { cartConfirm } from "../redux/reducers/product.reducer";
import { toast } from "react-toastify";

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
  const [address, setAddress] = useState<string>("");
  const [phone, setPhone] = useState<string>("");

  const navigate = useNavigate();

  const dispath = useDispatch();
  const dispatchAsync = useAppDispatch();

  const userId = useSelector<RootState, number>(
    (state) => state.persisted.users.userId
  );

  const cart = useSelector<RootState, CartProduct[]>(
    (state) => state.product.cart
  );

  const handleChangeQuantity = (
    type: string,
    cart_id: string,
    showQuantity: number,
    setShowQuantity: React.Dispatch<React.SetStateAction<number>>,
    price: number
  ) => {
    if (type === "increase") {
      let newQuantity = showQuantity;

      const pricePerProduct = price / showQuantity;
      const newPrice = price + pricePerProduct;

      newQuantity++;

      const cloneCart = cart;
      for (let i = 0; i < cloneCart.length; ++i) {
        if (cloneCart[i].cart_id === cart_id) {
          cloneCart[i].price = newPrice;
        }
      }

      // dispath({
      //   type: "products/increaseProductToCart",
      //   payload: {
      //     cart_id: cart_id,
      //     quantity: newQuantity,
      //     price: newPrice,
      //   },
      // });

      dispath({
        type: "products/updateCart",
        payload: cloneCart,
      });

      setShowQuantity(newQuantity);
    }

    if (type === "decrease") {
      let newQuantity = showQuantity;

      const pricePerProduct = price / showQuantity;
      const newPrice = price - pricePerProduct;

      newQuantity--;

      const cloneCart = cart;
      for (let i = 0; i < cloneCart.length; ++i) {
        if (cloneCart[i].cart_id === cart_id) {
          cloneCart[i].price = newPrice;
        }
      }

      // dispath({
      //   type: "products/decreaseProductToCart",
      //   payload: {
      //     cart_id: cart_id,
      //     quantity: newQuantity,
      //     price: newPrice,
      //   },
      // });

      dispath({
        type: "products/updateCart",
        payload: cloneCart,
      });

      setShowQuantity(newQuantity);
    }
  };

  const handleCartConfirm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const text = "Xác nhận thanh toán?";

    if (confirm(text) == true) {
      const filterDetail = cart.map((product: any) => {
        return {
          productId: product.id,
          quantity: product.quantity,
          size: product.size ? product.size : "",
          toppingIds: product.topping ? product.topping : null,
        };
      });

      const cartData: any = {
        userId: userId,
        shippingInfoAddress: address,
        shippingInfoPhone: phone,
        shippingInfoFee: 0,
        detail: filterDetail,
      };

      console.log(cartData);

      try {
        const res = await dispatchAsync(cartConfirm(cartData)).unwrap();
        console.log(res);
        const { orderId } = res;

        toast.success("Thanh toán thành công");
        navigate(`/bill/${orderId}`);
      } catch (error) {
        toast.error("Thanh toán thất bại");
      }

      setAddress("");
      setPhone("");
    }
  };

  return (
    <div
      className="w-[95%] min-h-[400px] z-10 mx-auto mt-[300px] md:mt-[150px] mb-[100px] flex justify-center flex-wrap gap-10 
                xl:max-w-[1300px] md:justify-start md:items-center md:flex-row"
    >
      {cart?.length === 0 ? (
        <div className="w-[100%] flex flex-col gap-3 items-center">
          <p className="font-bold">Không có sản phẩm trong giỏ hàng</p>
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
        </div>
      ) : (
        <div className="w-[100%] flex flex-col gap-10">
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
                    {
                      cart_id,
                      product_id,
                      name,
                      size,
                      quantity,
                      topping,
                      price,
                      image,
                    },
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
                                src={image}
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
                            {topping?.length === 0 && "Không"}
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
                            <CurrencyFormat
                              value={price}
                              displayType={"text"}
                              suffix={"VNĐ"}
                              decimalScale={3}
                              fixedDecimalScale={true}
                            />
                          </Typography>
                        </td>
                        <td className={classes}>
                          <div className="flex gap-10">
                            {quantity !== undefined && (
                              <OrderProductQuantity
                                cart_id={cart_id}
                                price={price}
                                quantity={quantity}
                                handleChangeQuantity={handleChangeQuantity}
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

          <form
            className="w-[90%] md:w-[40%] self-center md:self-end flex flex-col gap-5"
            onSubmit={(e) => {
              handleCartConfirm(e);
            }}
          >
            <p className="text-center text-xl font-bold">Thông tin nhận hàng</p>
            <Input
              value={address}
              onChange={(e) => {
                setAddress(e.target.value);
              }}
              label="Địa chỉ nhận hàng"
              crossOrigin={undefined}
              required={true}
            />
            <Input
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
              }}
              label="Số điện thoại nhận hàng"
              crossOrigin={undefined}
              required={true}
            />
            <Button color="amber" type="submit">
              Thanh toán
            </Button>
          </form>
        </div>
      )}
    </div>
  );
};

export default OrderTable;
