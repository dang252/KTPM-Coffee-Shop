import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { Users } from './entities/user.entity';
import { loginRequest } from './dto/user.dto';
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
}
