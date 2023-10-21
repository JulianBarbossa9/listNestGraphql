import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/interface/user.interface';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ){}

  async signIn(id:string, passWord: string) : Promise<any> {
    const user = await this.usersService.findOneUser(id)

    if(user?.password !== passWord) {
      throw new UnauthorizedException()
    }

    // const { password, ...result } = user
    //TODO: Implement JWT
    // return result
    const payload = { sub: user.id, username: user.username}
    return {
      access_token: await this.jwtService.signAsync(payload)
    } 
  }

  async createUser(createUserInput: User): Promise<User> {
    const newUser = await this.usersService.createUser(createUserInput)
    return newUser
  }
}
