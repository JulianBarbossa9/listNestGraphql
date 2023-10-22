import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { SignUpInput } from './dto/inputs/signup.input';
import { AuthResponse } from './types/auth-response.type';

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

  // @Mutation(, { name: 'login'})
  // async login(
  //   //Some info that we recived
  // ): Promise<???> {
  //   // return this.authService.login()
  // }

  // @Query(/**??? */, {name: 'revalidate'})
  // async revalidateToken() {
  //   // return this.authService.revalidateToken()
  // }
}



