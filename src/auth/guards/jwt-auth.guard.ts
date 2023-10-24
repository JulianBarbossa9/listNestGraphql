import { ExecutionContext } from "@nestjs/common"
import { GqlExecutionContext } from "@nestjs/graphql"
import { AuthGuard } from "@nestjs/passport"

/**
 *               [HTTP Request]   
 * AuthGuard ====> Client Side  -------> Guard -------> Route Handler
 * 
 */

//Guards have a single responsibility. They determine whether a given request will be handled by the route handler or not, depending on certain conditions (like permissions, roles, ACLs, etc.) 

//Guards similar to middelware
export class JwtAuthGuard extends AuthGuard('jwt'){

  //! Override
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create( context )
    const request = ctx.getContext().req
    return request
  }
}