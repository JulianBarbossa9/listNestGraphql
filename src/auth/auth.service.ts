import { BadRequestException, Injectable } from '@nestjs/common';
import { SignUpInput, LoginInput } from './dto/inputs/index';
import { AuthResponse } from './types/auth-response.type';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
  constructor(private readonly usersSevice: UsersService) {}

  async signup(signupInput: SignUpInput): Promise<AuthResponse> {
    //TODO: Create User
    const user = await this.usersSevice.create(signupInput);

    //TODO: Create JWT
    const token = '123';

    return { token, user };
  }

  async login(loginInput: LoginInput): Promise<AuthResponse> {
    const { email, password } = loginInput //password come tho the input
    const userLogin = await this.usersSevice.findOneByEmail(email)//db password hash
    const token = 'ABC123'

    //Compare the password coming from the input with the password in the database
    if( !bcrypt.compareSync( password, userLogin.password )){
      throw new BadRequestException('Email/Password is incorrect')
    }

    //TODO: JWT

    return {
      token,
      user: userLogin
    }
  }
}
