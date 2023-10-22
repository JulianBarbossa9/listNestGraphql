//Type of the response in the part of authentication

import { Field, ObjectType } from "@nestjs/graphql";
import { User } from "src/users/entities/user.entity";

@ObjectType()//Is how like the guery like, is the info that we wanna response to the person make the query
export class AuthResponse {

  @Field(() => String)
  token: string
  
  
  @Field(() => User)
  user: User

}