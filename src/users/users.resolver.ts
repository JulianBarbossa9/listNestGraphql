import { Resolver, Query, Mutation, Args, Int, ID } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { ValidRolesArgs } from './dto/args/roles.args';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  

  @Query(() => [User], { name: 'users' })
  async findAll(
    @Args() validRoles: ValidRolesArgs//ValidRolesArgs is of type array
  ): Promise<User[]> {
    // console.log({validRoles})
    return this.usersService.findAll(validRoles.roles);//FindAll expect an array, and we send a validRoles.roles that is an array
  }

  @Query(() => User, { name: 'user' })
  async findOne(@Args('email', { type: () => String }) id: string): Promise<User> {
    return this.usersService.findOneByEmail(id);
  }

  
  @Mutation(() => User)
  async blockUser(@Args('id', { type: () => ID }) id: string): Promise<User> {
    return this.usersService.block(id);
  }
}
