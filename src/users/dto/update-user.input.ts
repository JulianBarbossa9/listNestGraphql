import { IsArray, IsBoolean, IsNotEmpty, IsOptional } from 'class-validator';
import { CreateUserInput } from './create-user.input';
import { InputType, Field, Int, PartialType, ID } from '@nestjs/graphql';
import { ValidRoles } from 'src/auth/enums/valid-role.enums';

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
  
  //The another field are 
  @Field(() => ID)
  @IsNotEmpty()
  id: string;

  @Field(() => [ValidRoles], { nullable: true})
  @IsArray()
  @IsOptional()
  roles?: ValidRoles[]
  
  @Field(() => Boolean, { nullable: true})
  @IsBoolean()
  @IsOptional()
  isActive?: boolean

}
