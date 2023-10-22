import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users'})
@ObjectType()
export class User {

  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string
  
  @Column()
  @Field(() => String )
  fullName: string
  
  
  @Column({ unique: true })
  @Field(() => String)
  email: string
  
  @Column()
  // @Field(() => String) With this we say we don't make querys with passwords
  password: string
  
  
  @Column({
    type: 'text',
    array: true,
    default: ['user']
  })
  @Field(() => [String])
  roles: string[]
  
  @Column({
    type: 'boolean',
    default: true //We say that each new user is created have de value for default as true
  })
  @Field(() => Boolean)
  isActive: boolean

  //TODO: Relationships


}
