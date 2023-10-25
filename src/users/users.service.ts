import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt'
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';
import { SignUpInput } from 'src/auth/dto/inputs/signup.input';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ValidRoles } from 'src/auth/enums/valid-role.enums';

@Injectable()
export class UsersService {
  
  //Sevice of log to show possible errors
  private logger: Logger = new Logger('UsersService')
  
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>
    ){}
    
  async create( signupInput: SignUpInput): Promise<User> {
    try {
      
      const newUser = this.usersRepository.create({
        ...signupInput,
        password: bcrypt.hashSync(signupInput.password, 9)
      })
      return await this.usersRepository.save(newUser)

    } catch (error) {
      
      // console.log(error)
      // throw new BadRequestException('Something is wrong')
      this.handleDBErrors(error)

    }
  }

  async findAll( roles?: ValidRoles[]): Promise<User[]> {
    // return await this.usersRepository.find()//show all users
   if (roles.length === 0) return await this.usersRepository.find()//show all users
   
   
   //show users by roles
   return this.usersRepository.createQueryBuilder()
    .andWhere('ARRAY[roles] && ARRAY[:...roles]')//This is a postgresql query, where ARRAY[roles] is the column of the table(db) and ARRAY[:...roles] is the value that we send in graphql
    .setParameter('roles', roles) // This is the value that we send in the query above
    .getMany()//This is the result of the query
  }

  async findOneByEmail(email: string): Promise<User> {
    // throw new Error('FindOne not implemented');
    try {
      // const userExist = await this.usersRepository.findOneByOrFail({email})
      // if(!userExist) throw new Error(`User with email:${email} doen't exist`)
      const userExist = await this.usersRepository.findOneByOrFail({email})//This thorw the error is email not found
      return userExist
    } catch (error) {
      // this.handleDBErrors({
      //   code: 'error-001',
      //   detail: `${email} not found`
      // })
      throw new NotFoundException(`${email} not found`)
    }
  }

  update(id: number, updateUserInput: UpdateUserInput) {
    return `This action updates a #${id} user`;
  }

  async block(id: string): Promise<User> {
    throw new Error('FindOne not implemented');
  }

  //Handle errors
  //never means not reuturn anything

  private handleDBErrors (error: any): never {
    if (error === '23505'){
      throw new BadRequestException( error.detail.replace('key', ''))
    }
    
    if (error === 'error-001'){
      throw new BadRequestException( error.detail.replace('key', ''))
    }
    this.logger.error( error )
    throw new InternalServerErrorException('Please check server logs')
  }

  async findOneById(id: string): Promise<User>{
    try {
      return await this.usersRepository.findOneByOrFail({id})
    } catch (error) {
      this.handleDBErrors(error)
    }
  }

}
