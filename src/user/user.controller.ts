/* eslint-disable prettier/prettier */
import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userservice: UserService){}
    @Get('/:id')
    getUser(@Param('id') user_id: string){
        return this.userservice.findUserById(user_id);
    }
    @Get()
    getAllUsers(){
        return this.userservice.findAll();
    }
}
