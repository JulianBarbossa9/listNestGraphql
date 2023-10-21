import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User as UserInterface } from 'src/interface/user.interface';
import { User } from 'src/users/entities/users.entity';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CreateUserInput } from 'src/users/dto/inputs/create-user.input';

// @Controller('auth')
@Resolver(() => User)
export class AuthResolver {

  constructor( 
    private authService: AuthService
  ){}

  @Mutation(() => User)
  async createUser(
    @Args('createUser') createUserInput: CreateUserInput
  ): Promise<UserInterface> {
    return this.authService.createUser(createUserInput)
  }

  //Api rest with nestJS  
  // @HttpCode(HttpStatus.OK)
  // @Post('login')
  // signIn(@Body() signInDto: Record<User, [string]>){
  //   // return this.authService.signIn(signInDto.username, signInDto.password)
    
  //   return this.authService.createUser(signInDto)
  // }
}
