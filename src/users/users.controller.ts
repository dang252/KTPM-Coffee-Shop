import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { Users } from './entities/user.entity';
import { loginRequest, logoutRequest, refreshRequest } from './dto/user.dto';
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';
import { RefreshTokenGuard } from 'src/common/guards/refreshToken.guard';
// import { Response } from 'express'

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Post("/register")
    async register(@Body() user: Users) {
        return await this.usersService.register(user)
    }

    @Post("/login")
    async login(@Body() req: loginRequest) {
        return await this.usersService.login(req)
    }

    @UseGuards(AccessTokenGuard)
    @Post("/logout")
    async logout(@Body() req: logoutRequest) {
        return await this.usersService.logout(req)
    }

    @UseGuards(RefreshTokenGuard)
    @Post("/refresh")
    async refresh(@Req() req: Request) {
        const refreshReq = new refreshRequest()
        refreshReq.userId = (req['user']).sub
        refreshReq.refreshToken = (req['user']).refreshToken
        return await this.usersService.refresh(refreshReq)
    }
}
