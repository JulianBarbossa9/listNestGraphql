import { ObjectType, Field, Int, ID, Float } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'items' })//With this we say this is a entity
@ObjectType()
export class Item {
  //columns 

  @PrimaryGeneratedColumn('uuid')//typeorm
  @Field(() => ID)//graphql
  id: string

  @Column()//typeorm
  @Field(() => String) //graphql
  name: string
  
  @Column()//typeorm
  @Field(() => Float) //graphql
  quantity: number
  
  @Column()//typeorm
  @Field(() => String) //graphql
  quantityUnits: string //gr, ml,kg, 

  // stores
  // users
}
