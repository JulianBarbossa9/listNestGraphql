import { InputType, Int, Field, Float } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, IsPositive, IsString } from 'class-validator';

@InputType()
export class CreateItemInput {
  //This field are necessary for create a item
  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  name: string
  
  @Field(() => Float)
  @IsPositive()
  quantity: number
  
  @Field(() => String, 
    { nullable: true }
  )
  @IsString()
  @IsOptional()
  quantityUnits?: string
}
