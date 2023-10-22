import { Injectable } from '@nestjs/common';
import { SignUpInput } from './dto/inputs/signup.input';
import { AuthResponse } from './types/auth-response.type';
import { UsersService } from 'src/users/users.service';

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
}
