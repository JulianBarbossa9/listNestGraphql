import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { AuthResponse } from './types/auth-response.type';
import { LoginInput, SignUpInput } from './dto/inputs/index';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { CurrentUser } from './decorators/current-user.decorator';
import { User } from 'src/users/entities/user.entity';

@Resolver()
export class AuthResolver {
  
  constructor(
    private readonly authService: AuthService
  ){}

  
  // @Mutation(/**type of mutation */, {/**name */})
  @Mutation(() => AuthResponse, { name: 'signup'})
  async signup(
    @Args('signUpInput') signUpInput: SignUpInput
  ): Promise<AuthResponse> {
    return this.authService.signup(signUpInput)//call the signup this come of authservice
  }
  //Is recommend create this in a RESTfUL api traditional
  @Mutation(() => AuthResponse , { name: 'login'})
  async login(
    @Args('loginInput') loginInput: LoginInput
  ): Promise<AuthResponse> {
    // return this.authService.login()
    return this.authService.login(loginInput)
  }

  @Query(() => AuthResponse, {name: 'revalidate'})
  @UseGuards( JwtAuthGuard) //This input need a JWT
  revalidateToken(
    //We need the user id to revalidate token
    @CurrentUser() user: User
  ) : AuthResponse{
    return this.authService.revalidateToken(user)
    

  }
}



