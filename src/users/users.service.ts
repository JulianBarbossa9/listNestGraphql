import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import * as bcrypt from 'bcrypt'
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';
import { SignUpInput } from 'src/auth/dto/inputs/signup.input';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

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

  async findAll(): Promise<User[]> {
    return [];
  }

  async findOne(id: string): Promise<User> {
    throw new Error('FindOne not implemented');
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
    this.logger.error( error )
    throw new InternalServerErrorException('Please check server logs')
  }

}
