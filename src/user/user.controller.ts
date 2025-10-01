/* eslint-disable prettier/prettier */
import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userservice: UserService){}
    @Get('/:id')
    getUser(@Param('id') id: string){
        return this.userservice.findUserById(id);
    }
    @Get()
    getAllUsers(){
        return this.userservice.findAll();
    }
}
