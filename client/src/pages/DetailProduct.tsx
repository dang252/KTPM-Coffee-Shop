import { useEffect, useState } from "react";

import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

import { v4 as uuidv4 } from "uuid";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Link, useNavigate, useParams } from "react-router-dom";
import * as CurrencyFormat from "react-currency-format";

// Reduc/redux-toolkit config import
import { useDispatch, useSelector } from "react-redux";
// import { useAppDispatch } from "../redux/hooks";
// import { RootState } from "../redux/store";

import HomeCardSmall from "../components/HomeCardSmall";
import ProductQuantity from "../components/ProductQuantity";

import { CoffeeCartDirector } from "../builders/product-director";
import { useAppDispatch } from "../redux/hooks/hooks";
import {
  followProduct,
  getProductDetail,
} from "../redux/reducers/product.reducer";
import ToppingComponent from "../components/ToppingComponent";
import { HeartFilled, HeartOutlined } from "@ant-design/icons";
import { RootState } from "../redux/store";

const DetailProduct = () => {
  const { id } = useParams();

  const dispath = useDispatch();

  const [name, setName] = useState<string>("");
  const [size, setSize] = useState<string>("");
  const [price, setPrize] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(1);
  const [toppings, setToppings] = useState<number[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [follow, setFollow] = useState<boolean>(false);

  const navigate = useNavigate();

  const dispathAsync = useAppDispatch();
  const userId = useSelector<RootState, number>(
    (state) => state.persisted.users.userId
  );
  const [product, setProduct] = useState<any>();
  useEffect(() => {
    const getData = async (id: number) => {
      try {
        console.log("fetch");
        const data = await dispathAsync(
          getProductDetail({ productId: id, userId: userId })
        );
        setProduct(data?.payload);
        console.log("successs", data);
      } catch (error) {
        console.log(error);
        toast.error("Can't get product detail, try again later!");
      }
    };
    window.scrollTo(0, 0);
    getData(Number(id));
  }, [dispathAsync, id, userId]);

  useEffect(() => {
    // console.log(product)
    document.title = product?.product.productName;
    setName(product?.product.productName);
    setPrize(product?.product.productPrice / 1000);
    setFollow(product?.isFollow);
  }, [product]);

  const initProductId = product?.product.productId;
  const initName = product?.product.productName;
  const initPrice = product?.product.productPrice / 1000;
  const initImage = product?.productImages[0].url;

  const handleGetToppingPrice = (toppings: number[]): number => {
    let count = 0;
    for (let i = 0; i < toppings.length; ++i) {
      // count += toppings[i].price
      count += 10.0;
    }
    return count;
  };

  useEffect(() => {
    if (size === "small")
      setPrize(quantity * (initPrice + handleGetToppingPrice(toppings)));
    if (size === "medium")
      setPrize(
        quantity *
          (initPrice +
            product?.product.upsize[0] / 1000 +
            handleGetToppingPrice(toppings))
      );
    if (size === "large")
      setPrize(
        quantity *
          (initPrice +
            product?.product.upsize[1] / 1000 +
            handleGetToppingPrice(toppings))
      );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quantity, product]);

  const handleChooseSize = (type: string) => {
    setQuantity(1);
    setToppings([]);

    if (size === type) {
      setSize("");
      setPrize(initPrice);

      return;
    }

    setSize(type);
    setPrize(initPrice);
    if (type === "small") setPrize(initPrice);
    if (type === "medium") setPrize(initPrice + 6.0);
    if (type === "large") setPrize(initPrice + 10.0);
  };

  const handleAddTopping = (id: number, toppingPrice: number) => {
    if (toppings.includes(id)) {
      setToppings(toppings.filter((topping) => topping !== id));
      setPrize(price - toppingPrice);
    } else {
      setToppings([...toppings, id]);
      setPrize(price + toppingPrice);
    }
  };

  const handleOpen = () => setOpen(!open);

  const handleAddProduct = () => {
    if (size === "") {
      toast.error("Vui lòng chọn size!");
    } else {
      // const product: Product = {
      //   id: 1,
      //   name: "CloudFee Hạnh Nhân Nướng",
      //   price: 49.0,
      //   size: size,
      //   topping: toppings,
      //   quantity: quantity,
      // };

      const productName: string = name.toLocaleLowerCase();

      console.log(productName);

      // if (productName.includes("cloudfee")) {

      // }

      const id = uuidv4();

      const productBuider = CoffeeCartDirector.construct(
        id,
        initProductId,
        initName,
        quantity,
        size,
        toppings,
        price,
        initImage
      );

      dispath({ type: "products/addProductToCart", payload: productBuider });
      handleOpen();

      setSize("");
      setToppings([]);
      setQuantity(1);
    }
  };

  const onFollow = async () => {
    try {
      await dispathAsync(
        followProduct({ productId: Number(id), userId: userId })
      );
      setFollow(!follow);
    } catch (error) {
      toast.error("Something wrong, try again later!");
    }
  };

  return (
    <>
      <Dialog open={open} size="sm" handler={handleOpen}>
        <DialogHeader>Thêm sản phẩm vào giỏ hàng thành công!</DialogHeader>
        <DialogBody>
          Bạn có thể đi đến trang thanh toán để đặt hàng sản phẩm hoặc tiếp tục
          lựa chọn sản phẩm khác
        </DialogBody>
        <DialogFooter>
          <Button variant="gradient" onClick={handleOpen} className="mr-1">
            <span>Tiếp tục chọn sản phẩm</span>
          </Button>
          <Button
            variant="gradient"
            color="green"
            onClick={() => {
              navigate("/order");
            }}
          >
            <span>Thanh toán</span>
          </Button>
        </DialogFooter>
      </Dialog>
      <div
        className="mt-[100px] w-[95%] mx-auto mb-[100px] flex justify-center flex-wrap gap-10 
          md:mt-[50px] md:max-w-[1100px] md:justify-start md:items-center md:flex-row"
      >
        <div className="flex flex-wrap gap-3 text-sm">
          <Link to="/" className="hover:cursor-pointer hover:text-[#e57905]">
            Menu
          </Link>
          <p>/</p>
          <Link to="/" className="hover:cursor-pointer hover:text-[#e57905]">
            Sản phẩm hot trang chủ
          </Link>
          <p>/</p>
          <p className="font-bold text-gray-500">
            {product?.product.productName}
          </p>
        </div>
        <div className="w-[100%] flex flex-col gap-3 md:gap-[100px] md:flex-row justify-between">
          <div className="w-[100%] md:w-[50%]">
            <img src={product?.productImages[0].url} />
          </div>
          <div className="w-[100%] md:w-[50%] mt-10 md:mt-0">
            <div className="flex flex-col gap-3">
              <div className="flex items-center">
                <p className="font-bold text-2xl">{name}</p>
                <div onClick={onFollow}>
                  {userId && follow ? (
                    <HeartFilled
                      className=""
                      style={{
                        fontSize: "30px",
                        marginLeft: "10px",
                        color: "hotpink",
                      }}
                    />
                  ) : (
                    <HeartOutlined
                      className=""
                      style={{ fontSize: "30px", marginLeft: "10px" }}
                    />
                  )}
                </div>
              </div>
              {/* <p className="font-bold text-2xl">{name}</p> */}
              <p className="font-bold text-2xl text-[#e57905]">
                {product?.product.productPrice} đ
              </p>
            </div>
            <div className="flex flex-col gap-3 mt-8">
              <p className="font-semibold">Chọn size (bắt buộc)</p>
              <div className="flex flex-wrap gap-5">
                <div
                  className={`py-2 px-5 flex items-center gap-3 rounded-md border hover:cursor-pointer ${
                    size === "small"
                      ? "text-white bg-[#e57905] border-[#e57905]"
                      : "text-gray-600 bg-white border-gray-400"
                  }`}
                  onClick={() => {
                    handleChooseSize("small");
                  }}
                >
                  <svg
                    fill={size === "small" ? "#fff" : "gray"}
                    width="20px"
                    height="20px"
                    viewBox="0 0 13 16"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      className="shape active"
                      d="M11.6511 1.68763H10.3529V0.421907C10.3529 0.194726 10.1582 0 9.93104 0H2.17444C1.94726 0 1.75254 0.194726 1.75254 0.421907V1.65517H0.454361C0.194726 1.68763 0 1.88235 0 2.10953V4.18661C0 4.41379 0.194726 4.60852 0.421907 4.60852H1.33063L1.72008 8.8925L1.78499 9.76876L2.30426 15.6105C2.33671 15.8377 2.49899 16 2.72617 16H9.28195C9.50913 16 9.70385 15.8377 9.70385 15.6105L10.2231 9.76876L10.288 8.8925L10.6775 4.60852H11.5862C11.8134 4.60852 12.0081 4.41379 12.0081 4.18661V2.10953C12.073 1.88235 11.8783 1.68763 11.6511 1.68763ZM2.56389 8.40568H3.50507C3.47262 8.56795 3.47262 8.73022 3.47262 8.8925C3.47262 9.02231 3.47262 9.15213 3.50507 9.28195H2.66126L2.6288 8.92495L2.56389 8.40568ZM9.47667 8.92495L9.44422 9.28195H8.56795C8.60041 9.15213 8.60041 9.02231 8.60041 8.8925C8.60041 8.73022 8.56795 8.56795 8.56795 8.40568H9.50913L9.47667 8.92495ZM7.72414 8.8925C7.72414 9.83367 6.97769 10.5801 6.03651 10.5801C5.09534 10.5801 4.34888 9.83367 4.34888 8.8925C4.34888 7.95132 5.09534 7.20487 6.03651 7.20487C6.97769 7.20487 7.72414 7.95132 7.72414 8.8925ZM8.92495 15.1562H3.18053L2.72617 10.1582H3.82961C4.28398 10.9371 5.09534 11.4564 6.03651 11.4564C6.97769 11.4564 7.8215 10.9371 8.24341 10.1582H9.34686L8.92495 15.1562ZM9.60649 7.52941H8.21095C7.75659 6.81542 6.94523 6.3286 6.03651 6.3286C5.12779 6.3286 4.31643 6.81542 3.86207 7.52941H2.49899L2.23935 4.60852H9.86613L9.60649 7.52941ZM11.1968 3.73225H10.3205H1.75254H0.876268V2.56389H2.17444H2.2069H2.23935H8.27586C8.50304 2.56389 8.69777 2.36917 8.69777 2.14199C8.69777 1.91481 8.50304 1.72008 8.27586 1.72008H2.6288V0.876268H9.47667V2.10953C9.47667 2.33671 9.6714 2.53144 9.89858 2.53144H11.1968V3.73225Z"
                    ></path>
                  </svg>
                  <p className="text-sm">Nhỏ + 0 đ</p>
                </div>
                <div
                  className={`py-2 px-5 flex items-center gap-3 rounded-md border hover:cursor-pointer ${
                    size === "medium"
                      ? "text-white bg-[#e57905] border-[#e57905]"
                      : "text-gray-600 bg-white border-gray-400"
                  }`}
                  onClick={() => {
                    handleChooseSize("medium");
                  }}
                >
                  <svg
                    fill={size === "medium" ? "#fff" : "gray"}
                    width="20px"
                    height="20px"
                    viewBox="0 0 13 16"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      className="shape active"
                      d="M11.6511 1.68763H10.3529V0.421907C10.3529 0.194726 10.1582 0 9.93104 0H2.17444C1.94726 0 1.75254 0.194726 1.75254 0.421907V1.65517H0.454361C0.194726 1.68763 0 1.88235 0 2.10953V4.18661C0 4.41379 0.194726 4.60852 0.421907 4.60852H1.33063L1.72008 8.8925L1.78499 9.76876L2.30426 15.6105C2.33671 15.8377 2.49899 16 2.72617 16H9.28195C9.50913 16 9.70385 15.8377 9.70385 15.6105L10.2231 9.76876L10.288 8.8925L10.6775 4.60852H11.5862C11.8134 4.60852 12.0081 4.41379 12.0081 4.18661V2.10953C12.073 1.88235 11.8783 1.68763 11.6511 1.68763ZM2.56389 8.40568H3.50507C3.47262 8.56795 3.47262 8.73022 3.47262 8.8925C3.47262 9.02231 3.47262 9.15213 3.50507 9.28195H2.66126L2.6288 8.92495L2.56389 8.40568ZM9.47667 8.92495L9.44422 9.28195H8.56795C8.60041 9.15213 8.60041 9.02231 8.60041 8.8925C8.60041 8.73022 8.56795 8.56795 8.56795 8.40568H9.50913L9.47667 8.92495ZM7.72414 8.8925C7.72414 9.83367 6.97769 10.5801 6.03651 10.5801C5.09534 10.5801 4.34888 9.83367 4.34888 8.8925C4.34888 7.95132 5.09534 7.20487 6.03651 7.20487C6.97769 7.20487 7.72414 7.95132 7.72414 8.8925ZM8.92495 15.1562H3.18053L2.72617 10.1582H3.82961C4.28398 10.9371 5.09534 11.4564 6.03651 11.4564C6.97769 11.4564 7.8215 10.9371 8.24341 10.1582H9.34686L8.92495 15.1562ZM9.60649 7.52941H8.21095C7.75659 6.81542 6.94523 6.3286 6.03651 6.3286C5.12779 6.3286 4.31643 6.81542 3.86207 7.52941H2.49899L2.23935 4.60852H9.86613L9.60649 7.52941ZM11.1968 3.73225H10.3205H1.75254H0.876268V2.56389H2.17444H2.2069H2.23935H8.27586C8.50304 2.56389 8.69777 2.36917 8.69777 2.14199C8.69777 1.91481 8.50304 1.72008 8.27586 1.72008H2.6288V0.876268H9.47667V2.10953C9.47667 2.33671 9.6714 2.53144 9.89858 2.53144H11.1968V3.73225Z"
                    ></path>
                  </svg>
                  <p className="text-sm">
                    Vừa + {product?.product.upsize[0]} đ
                  </p>
                </div>
                <div
                  className={`py-2 px-5 flex items-center gap-3 rounded-md border hover:cursor-pointer ${
                    size === "large"
                      ? "text-white bg-[#e57905] border-[#e57905]"
                      : "text-gray-600 bg-white border-gray-400"
                  }`}
                  onClick={() => {
                    handleChooseSize("large");
                  }}
                >
                  <svg
                    fill={size === "large" ? "#fff" : "gray"}
                    width="20px"
                    height="20px"
                    viewBox="0 0 13 16"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      className="shape active"
                      d="M11.6511 1.68763H10.3529V0.421907C10.3529 0.194726 10.1582 0 9.93104 0H2.17444C1.94726 0 1.75254 0.194726 1.75254 0.421907V1.65517H0.454361C0.194726 1.68763 0 1.88235 0 2.10953V4.18661C0 4.41379 0.194726 4.60852 0.421907 4.60852H1.33063L1.72008 8.8925L1.78499 9.76876L2.30426 15.6105C2.33671 15.8377 2.49899 16 2.72617 16H9.28195C9.50913 16 9.70385 15.8377 9.70385 15.6105L10.2231 9.76876L10.288 8.8925L10.6775 4.60852H11.5862C11.8134 4.60852 12.0081 4.41379 12.0081 4.18661V2.10953C12.073 1.88235 11.8783 1.68763 11.6511 1.68763ZM2.56389 8.40568H3.50507C3.47262 8.56795 3.47262 8.73022 3.47262 8.8925C3.47262 9.02231 3.47262 9.15213 3.50507 9.28195H2.66126L2.6288 8.92495L2.56389 8.40568ZM9.47667 8.92495L9.44422 9.28195H8.56795C8.60041 9.15213 8.60041 9.02231 8.60041 8.8925C8.60041 8.73022 8.56795 8.56795 8.56795 8.40568H9.50913L9.47667 8.92495ZM7.72414 8.8925C7.72414 9.83367 6.97769 10.5801 6.03651 10.5801C5.09534 10.5801 4.34888 9.83367 4.34888 8.8925C4.34888 7.95132 5.09534 7.20487 6.03651 7.20487C6.97769 7.20487 7.72414 7.95132 7.72414 8.8925ZM8.92495 15.1562H3.18053L2.72617 10.1582H3.82961C4.28398 10.9371 5.09534 11.4564 6.03651 11.4564C6.97769 11.4564 7.8215 10.9371 8.24341 10.1582H9.34686L8.92495 15.1562ZM9.60649 7.52941H8.21095C7.75659 6.81542 6.94523 6.3286 6.03651 6.3286C5.12779 6.3286 4.31643 6.81542 3.86207 7.52941H2.49899L2.23935 4.60852H9.86613L9.60649 7.52941ZM11.1968 3.73225H10.3205H1.75254H0.876268V2.56389H2.17444H2.2069H2.23935H8.27586C8.50304 2.56389 8.69777 2.36917 8.69777 2.14199C8.69777 1.91481 8.50304 1.72008 8.27586 1.72008H2.6288V0.876268H9.47667V2.10953C9.47667 2.33671 9.6714 2.53144 9.89858 2.53144H11.1968V3.73225Z"
                    ></path>
                  </svg>
                  <p className="text-sm">
                    Lớn + {product?.product.upsize[1]} đ
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-3 mt-10">
              <p className="font-semibold">Topping</p>
              <div className="flex flex-wrap gap-5">
                {product?.toppingList &&
                  product.toppingList.map((topping: any) => {
                    const uid = uuidv4();

                    return (
                      <ToppingComponent
                        key={uid}
                        topping={topping}
                        isActive={toppings.includes(topping.toppingId)}
                        handleAddTopping={handleAddTopping}
                      />
                    );
                  })}
              </div>
            </div>
            <div className="my-10">
              <p className="font-semibold mb-3">Số lượng</p>
              <ProductQuantity quantity={quantity} setQuantity={setQuantity} />
            </div>
            <div className="my-10">
              <p className="font-semibold mb-3">Thành tiền</p>
              <p className="text-2xl font-bold text-[#e57905]">
                <CurrencyFormat
                  value={price}
                  displayType={"text"}
                  suffix={"VNĐ"}
                  decimalScale={3}
                  fixedDecimalScale={true}
                />
              </p>
            </div>
            <div
              className="flex gap-3 justify-center items-center text-white font-semibold p-3 rounded-md bg-[#e57905] hover:cursor-pointer"
              onClick={() => {
                handleAddProduct();
              }}
            >
              <svg
                width="21"
                height="21"
                viewBox="0 0 21 21"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14 0C14.5523 0 15 0.447715 15 1V1.999L20 2V8L17.98 7.999L20.7467 15.5953C20.9105 16.032 21 16.5051 21 16.999C21 19.2082 19.2091 20.999 17 20.999C15.1368 20.999 13.5711 19.7251 13.1265 18.0008L8.87379 18.0008C8.42948 19.7256 6.86357 21 5 21C3.05513 21 1.43445 19.612 1.07453 17.7725C0.435576 17.439 0 16.7704 0 16V3C0 2.44772 0.447715 2 1 2H8C8.55228 2 9 2.44772 9 3V11C9 11.5128 9.38604 11.9355 9.88338 11.9933L10 12H12C12.5128 12 12.9355 11.614 12.9933 11.1166L13 11V2H10V0H14ZM5 15C3.89543 15 3 15.8954 3 17C3 18.1046 3.89543 19 5 19C6.10457 19 7 18.1046 7 17C7 15.8954 6.10457 15 5 15ZM17 14.999C15.8954 14.999 15 15.8944 15 16.999C15 18.1036 15.8954 18.999 17 18.999C18.1046 18.999 19 18.1036 19 16.999C19 15.8944 18.1046 14.999 17 14.999ZM15.852 7.999H15V11C15 12.6569 13.6569 14 12 14H10C8.69412 14 7.58312 13.1656 7.17102 12.0009L1.99994 12V14.3542C2.73289 13.5238 3.80528 13 5 13C6.86393 13 8.43009 14.2749 8.87405 16.0003H13.1257C13.5693 14.2744 15.1357 12.999 17 12.999C17.2373 12.999 17.4697 13.0197 17.6957 13.0593L15.852 7.999ZM7 7H2V10H7V7ZM18 4H15V6H18V4ZM7 4H2V5H7V4Z"
                  fill="white"
                  fillOpacity="0.6"
                ></path>
              </svg>
              <p>Thêm vào giỏ hàng</p>
            </div>
          </div>
        </div>
        <div className="w-[100%] h-[1px] bg-gray-200"></div>
        <div className="flex flex-col">
          <p className="font-bold">Mô tả sản phẩm</p>
          <p className="text-justify mt-3">
            {product?.product.productDescription}
          </p>
        </div>
        <div className="w-[100%] h-[1px] bg-gray-200"></div>
        <div className="flex flex-col">
          <p className="font-bold">Sản phẩm liên quan</p>
          <div className="flex flex-wrap gap-5 mt-5">
            <HomeCardSmall />
            <HomeCardSmall />
            <HomeCardSmall />
            <HomeCardSmall />
            <HomeCardSmall />
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailProduct;
