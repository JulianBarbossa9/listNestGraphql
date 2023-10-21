import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";



@Entity({name: 'users'})
@ObjectType()//is to automatically create GraphQL schema definitions from TypeScript classes.
export class User {
  
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string

  @Column()
  @Field(() => String)
  name: string

  @Column()
  @Unique(['username'])
  @Field(() => String)
  username: string

  @Column()
  @Unique(['email'])
  @Field(() => String)
  email: string

  @Column()
  @Field(() => String)
  password: string
}