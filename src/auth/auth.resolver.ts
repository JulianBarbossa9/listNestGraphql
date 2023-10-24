import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { AuthResponse } from './types/auth-response.type';
import { LoginInput, SignUpInput } from './dto/inputs/index';

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

  @Mutation(() => AuthResponse , { name: 'login'})
  async login(
    @Args('loginInput') loginInput: LoginInput
  ): Promise<AuthResponse> {
    // return this.authService.login()
    return this.authService.login(loginInput)
  }

  // @Query(/**??? */, {name: 'revalidate'})
  // async revalidateToken() {
  //   // return this.authService.revalidateToken()
  // }
}



