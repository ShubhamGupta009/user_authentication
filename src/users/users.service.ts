/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { Role } from 'src/auth/role.enum';
export type User = any;
@Injectable()
export class UsersService {
  private readonly users = [
    {
      userId: 1,
      username: 'Shubham',
      Password: '11023010004',
      roles:[Role.User]
    },
    {
      userId: 2,
      username: 'Gurmeet',
      password: 'HelloWorld',
      roles:[Role.Admin]
    },
  ];
  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }
}
