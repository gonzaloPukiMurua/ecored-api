/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './entities/user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
    constructor(private readonly userRepository: UserRepository){}
    async findAll(){
        return await this.userRepository.findAll();
    }
    async findUserById(id: string): Promise<User>{
        
        const user = await this.userRepository.findOne(id);
        if(!user){
            throw new NotFoundException(`User with id ${id} not found.`)
        }
        return user;
    }
}
