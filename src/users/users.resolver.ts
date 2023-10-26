import { Resolver, Query, Mutation, Args, Int, ID } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { ValidRolesArgs } from './dto/args/roles.args';
import { ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { ValidRoles } from 'src/auth/enums/valid-role.enums';

@Resolver(() => User)
@UseGuards( JwtAuthGuard )
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  

  @Query(() => [User], { name: 'users' })
  async findAll(
    @Args() validRoles: ValidRolesArgs,//ValidRolesArgs is of type array
    @CurrentUser([ValidRoles.admin, ValidRoles.superUser]) user: User//This is the user that is logged, only admin and superUser can see all users
  ): Promise<User[]> {
    
    return this.usersService.findAll(validRoles.roles);//FindAll expect an array, and we send a validRoles.roles that is an array
  }

  // @Query(() => User, { name: 'user' })
  // async findOne(@Args('email', { type: () => String }) id: string): Promise<User> {
  //   return this.usersService.findOneByEmail(id);
  // }

  @Query(() => User , { name: 'user', description: 'Search a user by Id'})
  async findOneById(
    @Args('id', { type: () => ID} , ParseUUIDPipe ) id: string, //with ParseUUIDPipe we validate thath the input is in type ParseUUIDPipe
    @CurrentUser([ValidRoles.admin, ValidRoles.superUser])  user: User
  ): Promise<User> {
    return this.usersService.findOneById(id)
  }

  
  @Mutation(() => User, { name: 'blockUser', description: 'Block user by Id '})
  async blockUser(
    @Args('id', { type: () => ID }, ParseUUIDPipe ) id: string,
    @CurrentUser([ValidRoles.admin, ValidRoles.superUser]) user: User
    
  ): Promise<User> {
    return this.usersService.block(id, user);
  }

  // @Mutation(() => User)
  // async updateRole(
  //   @Args('id', { type: () => ID }) id: string,
  // ): Promise<User> {
  //   return this.usersService.updateRole(id);
  // }

  
}
