import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsString } from "class-validator";
import { Unique } from "typeorm";

@InputType()
export class CreateUserInput {

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  name: string

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  username: string

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  email: string

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  password: string

  
}