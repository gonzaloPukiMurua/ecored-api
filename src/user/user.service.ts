/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './entities/user.entity';
import { UserRepository } from './user.repository';
import { CreateUserDto } from './DTOs/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(private readonly userRepository: UserRepository){}
    
    async findAll(): Promise<User[]> {
        return await this.userRepository.findAll();
    }

    async createUserWithHashedPassword(credentials: CreateUserDto): Promise<User> {
        const hashedPassword = await bcrypt.hash(credentials.password, 10);
        const newUser = this.userRepository['userRepository'].create({
            ...credentials,
            password: hashedPassword,
        });
        return await this.userRepository['userRepository'].save(newUser);
    }

    async findOneByEmail(email: string): Promise<User | null | undefined> {
        return await this.userRepository.findUserByEmail(email);
    }

    async findUserById(user_id: string): Promise<User>{
        
        const user = await this.userRepository.findOne(user_id);
        if(!user){
            throw new NotFoundException(`User with id ${user_id} not found.`)
        }
        return user;
    }
}
