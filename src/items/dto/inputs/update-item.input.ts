import { IsUUID } from 'class-validator';
import { CreateItemInput } from './create-item.input';
import { InputType, Field, Int, PartialType, ID } from '@nestjs/graphql';

@InputType()
export class UpdateItemInput extends PartialType(CreateItemInput) {
  
  @Field(() => ID)
  @IsUUID()
  id: string;

  // @Field(() => String)
  // name: string;

  // @Field(() => Number)
  // quantity: number;

  // @Field(() => String, {nullable: true})
  // quantityUnits?: string;
}
