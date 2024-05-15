import { Injectable } from '@nestjs/common';
export type User = any;
@Injectable()
export class UsersService {
  private readonly users = [
    {
      userId: 1,
      username: 'Shubham',
      Password: '11023010004',
    },
    {
      userId: 2,
      username: 'Gurmeet',
      password: 'HelloWorld',
    },
  ];
  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }
}
