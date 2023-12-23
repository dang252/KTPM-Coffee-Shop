import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './entities/user.entity';
import { LoginResponse, jwtResponse, loginRequest } from './dto/user.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';


@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(Users)
        private usersRepository: Repository<Users>,
        private jwtService: JwtService,
    ) { }

    async findUserById(id: number): Promise<Users> {
        return this.usersRepository.findOneBy({ userId: id });
    }

    // Hash data by bcrypt lib
    hashData(data: string) {
        return bcrypt.hash(data, 10);
    }

    // Hash the refresh token and save to database
    async hashRefreshToken(userId: number, refreshToken: string) {
        const hashRefreshToken = await this.hashData(refreshToken);
        const user = await this.findUserById(userId);
        user.refreshToken = hashRefreshToken;
        await this.usersRepository.save(user)
    }

    // Generate a pair of tokens: access_token and refresh_token
    async getTokens(userId: number, username: string): Promise<jwtResponse> {
        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync(
                {
                    sub: userId,
                    username: username,
                },
                {
                    secret: process.env.JWT_ACCESS_TOKEN_SECRET_KEY,
                    expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRE_TIME,
                },
            ),
            this.jwtService.signAsync(
                {
                    sub: userId,
                    username: username,
                },
                {
                    secret: process.env.JWT_REFRESH_TOKEN_SECRET_KEY,
                    expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRE_TIME,
                },
            ),
        ]);

        return {
            accessToken: accessToken,
            refreshToken: refreshToken,
        };
    }

    async findUserByUsername(username: string): Promise<Users> {
        return this.usersRepository.findOneBy({ username: username })
    }

    async findUserByEmail(email: string): Promise<Users> {
        return this.usersRepository.findOneBy({ email: email })
    }

    async register(user: Users): Promise<LoginResponse> {
        try {
            const isEmailExists = (await this.findUserByEmail(user.email) != null)
            const isUsernameExists = (await this.findUserByUsername(user.username) != null)
            if (!isEmailExists && !isUsernameExists) {
                //save to db
                const hashedPassword = await this.hashData(user.password)
                user.password = hashedPassword
                await this.usersRepository.save(user);
                //create response
                const tokens = await this.getTokens(user.userId, user.username)
                const response = new LoginResponse()
                response.userId = user.userId;
                response.username = user.username;
                response.accessToken = tokens.accessToken
                response.refreshToken = tokens.refreshToken
                await this.hashRefreshToken(response.userId, response.refreshToken)
                return response;
            }
            else {
                throw new HttpException('User Already Exist', HttpStatus.BAD_REQUEST)
            }
        }
        catch (error) {
            if (error instanceof HttpException) {
                throw error
            } else {
                throw new HttpException('INTERNAL SERVER ERROR', HttpStatus.INTERNAL_SERVER_ERROR)
            }
        }
    }

    async login(req: loginRequest): Promise<LoginResponse> {
        try {
            const user = await this.findUserByUsername(req.username)
            if (!user || !(await bcrypt.compare(req.password, user.password))) {
                throw new HttpException('WRONG USERNAME OR PASSWORD', HttpStatus.BAD_REQUEST)
            }
            //create response
            const tokens = await this.getTokens(user.userId, user.username)
            const response = new LoginResponse()
            response.userId = user.userId;
            response.username = user.username;
            response.accessToken = tokens.accessToken
            response.refreshToken = tokens.refreshToken
            await this.hashRefreshToken(response.userId, response.refreshToken)
            return response;
        }
        catch (error) {
            if (error instanceof HttpException) {
                throw error
            } else {
                throw new HttpException('INTERNAL SERVER ERROR', HttpStatus.INTERNAL_SERVER_ERROR)
            }
        }
    }
}
