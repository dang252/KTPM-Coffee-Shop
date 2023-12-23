import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class loginResponse {
    @IsNotEmpty()
    @IsNumber()
    userId: number;
    @IsNotEmpty()
    @IsString()
    username: string;
    @IsNotEmpty()
    @IsString()
    accessToken: string;
    @IsNotEmpty()
    @IsString()
    refreshToken: string;
}

export class loginRequest {
    @IsNotEmpty()
    @IsString()
    username: string;
    @IsNotEmpty()
    @IsString()
    password: string;
}

export class refreshRequest {
    @IsNotEmpty()
    @IsNumber()
    userId: number;
    @IsNotEmpty()
    @IsString()
    refreshToken: string;
}

export class logoutRequest {
    @IsNotEmpty()
    @IsNumber()
    userId: number;
}

export class jwtResponse {
    @IsNotEmpty()
    @IsString()
    accessToken: string;
    @IsNotEmpty()
    @IsString()
    refreshToken: string;
}