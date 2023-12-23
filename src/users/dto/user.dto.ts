import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class LoginResponse {
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
    @IsString()
    refreshToken: string;
}

export class jwtResponse {
    @IsNotEmpty()
    @IsString()
    accessToken: string;
    @IsNotEmpty()
    @IsString()
    refreshToken: string;
}