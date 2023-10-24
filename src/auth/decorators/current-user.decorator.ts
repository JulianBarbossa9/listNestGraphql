import { ExecutionContext, InternalServerErrorException, createParamDecorator } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";

export const CurrentUser = createParamDecorator( 
  ( roles = [], context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context)
    //take user that comes to the request
    const user = ctx.getContext().req.user //this can be null

    if(!user){
      //This is a error front back
      throw new InternalServerErrorException(`No user inside the request - make sure that we used the AuthGuard`)
    }

    return user

})