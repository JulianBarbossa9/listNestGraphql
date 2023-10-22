import { Field, InputType } from "@nestjs/graphql"
import { IsEmail, IsNotEmpty, MinLength } from "class-validator"

// this min info is that the front en send me
@InputType()
export class SignUpInput {

  @Field(() => String)
  @IsEmail()
  email: string
  
  @Field(() => String)
  @IsNotEmpty()
  fullName: string
  
  @Field(() => String)
  @MinLength(6)
  password: string
}