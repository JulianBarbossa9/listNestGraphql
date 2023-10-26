import { ExecutionContext, ForbiddenException, InternalServerErrorException, createParamDecorator } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { ValidRoles } from "../enums/valid-role.enums";
import { User } from "src/users/entities/user.entity";

export const CurrentUser = createParamDecorator( 
  //With this we say this type of the roles that we have
  ( roles : ValidRoles[] = [], context: ExecutionContext) => {
    // console.log(roles)
    const ctx = GqlExecutionContext.create(context)
    //take user that comes to the request
    const user: User = ctx.getContext().req.user //this can be null

    if(!user){
      //This is a error front back
      throw new InternalServerErrorException(`No user inside the request - make sure that we used the AuthGuard`)
    }

    //We say that if in the arg is empty, is open to everyone
    if ( roles.length === 0) return user

    //
    for (const role of user.roles){
      if ( roles.includes(role as ValidRoles)){ //we check in our array of 'roles' if the role in user.roles exist
        return user
      }
    }
    //If in the arg not come a role, then show this
    throw new ForbiddenException(
      `User ${user.fullName} need a valid role, the current role is: ${user.roles} `
    )

})