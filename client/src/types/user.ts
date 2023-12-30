export interface UserAccount {
    userId?: string;
    username?: string;
    password?: string;
    fullname?: string;
    email?: string;
    phone?: string;
    accessToken?: string;
    refreshToken?: string;
}

export interface JwtPayload {
    exp: number;
    iat: number;
    sub: string;
}