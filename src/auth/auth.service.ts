import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { SignUpInput, LoginInput } from './dto/inputs/index';
import { AuthResponse } from './types/auth-response.type';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersSevice: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  private getJWToken(userId: string) {
    return this.jwtService.sign({id: userId})//jwtService receives an object of type payload this data is hashable and travels through the network you can send all the user info or only in this case the id.
  }

  async signup(signupInput: SignUpInput): Promise<AuthResponse> {
    //TODO: Create User
    const user = await this.usersSevice.create(signupInput);

    //TODO: Create JWT
    // const token = this.jwtService.sign({id: user.id });
    const { id } = user
    const token = this.getJWToken(id)
    

    return { token, user };
  }

  async login(loginInput: LoginInput): Promise<AuthResponse> {
    const { email, password } = loginInput //password come tho the input
    const userLogin = await this.usersSevice.findOneByEmail(email)//db password hash

     //TODO: JWT
    const token = this.getJWToken(userLogin.id)

    //Compare the password coming from the input with the password in the database
    if( !bcrypt.compareSync( password, userLogin.password )){
      throw new BadRequestException('Email/Password is incorrect')
    }

   

    return {
      token,
      user: userLogin
    }
  }

  async validateUser (id: string) : Promise<User>{
    
    //Check if the user exist
    const user = await this.usersSevice.findOneById(id)

    //Check if the user is active
    if(!user.isActive){
      throw new UnauthorizedException(`The user with id: ${id} is not active`)
    }

    delete user.password //Not display the password
    return user
  }

  revalidateToken ( user: User) : AuthResponse {

    const token = this.getJWToken(user.id)
    return {
      token,
      user
    }
  }
}
