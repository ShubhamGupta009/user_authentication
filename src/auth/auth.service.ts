/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */


import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService, private jwtService: JwtService ) { }
    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.usersService.findOne(username);
        //console.log(user);
        if(user && user.password === pass)
        {
            const { password, ...result } = user
            return result;
        }
        return null;
    }
    async login(user: any)
    {
        const payload = { username: user.username, sub: user.userId };
        //console.log(payload);
        const token = this.jwtService.sign(payload);
        // // Return the token to the client
        return { accessToken: token };
    }
}