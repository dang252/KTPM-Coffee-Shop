import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { ProductImages, Products, Topping } from "../entities/product.entity";

export class ProductDto {
    @IsNotEmpty()
    @IsNumber()
    productId: number;

    @IsNotEmpty()
    @IsString()
    productName: string;

    @IsNotEmpty()
    @IsString()
    productDescription: string;

    @IsNumber()
    productPrice: number;

    @IsNumber()
    upsize: number[];

    @IsNotEmpty()
    @IsString()
    categories: string[];
}

export class ToppingDto {
    @IsNotEmpty()
    @IsNumber()
    toppingId: number;

    @IsNotEmpty()
    @IsString()
    toppingName: string;

    @IsNotEmpty()
    @IsNumber()
    toppingPrice: number;
}

export class ProductsResponse {
    product: Products;
    productImage: string;
}

export class ProductDetailDto {
    product: Products;
    productImages: ProductImages[];
    toppingList?: Topping[];
    isFollow: boolean
}

export class GetProductByIdRequest {
    productId: number;
}

export class FollowRequest {
    productId: number;
    userId: number;
}