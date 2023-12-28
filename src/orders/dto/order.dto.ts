import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Topping } from "src/products/entities/product.entity";


export class createOrderRequest {
    @IsNotEmpty()
    @IsNumber()
    userId: number;

    @IsNotEmpty()
    @IsString()
    shippingInfoAddress: string;

    @IsNotEmpty()
    @IsString()
    shippingInfoPhone: string;

    @IsNotEmpty()
    @IsNumber()
    shippingInfoFee: number;

    detail: createOrderRequestDetail[];
}

export class createOrderRequestDetail {
    @IsNotEmpty()
    @IsNumber()
    productId: number;

    @IsNotEmpty()
    @IsString()
    size?: string;

    @IsNotEmpty()
    @IsNumber()
    quantity: number;

    @IsNumber()
    toppingIds?: number[];
}

export class getOrderResponse {
    orderId: number;

    username: string;

    totalPrice: number;

    shippingInfoAddress: string;

    shippingInfoPhone: string;

    shippingInfoFee: number;

    details: OrderDetailResponse[];
}

export class OrderDetailResponse {
    productName: string;

    productOriginPrice: number;

    productTotalPrice: number;

    quantity: number;

    size?: string;

    toppingList?: Topping[]
}