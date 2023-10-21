import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './entities/users.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User as UserInterface } from 'src/interface/user.interface';


@Injectable()
export class UsersService {

  /**
   *  inyectar un repositorio de TypeORM se refiere a utilizar el sistema de inyección de dependencias del marco para proporcionar instancias de repositorios de TypeORM a tus componentes (por ejemplo, servicios) en lugar de crear esas instancias manualmente. 
   */
  constructor(
    @InjectRepository(User)//Inyect a repository of TypeORM into the service
    private readonly usersRepository: Repository<User>
  ){}


  async findOneUser(id: string): Promise<User> {
    const user = await this.usersRepository.findOneBy({id})

    if(!user) throw new NotFoundException(`User with Id: ${id} not found`)

    return user
  }

  async createUser (createUserInput: UserInterface ): Promise<UserInterface> {
    const newUser = this.usersRepository.create(createUserInput)
    await this.usersRepository.save(newUser)
    return newUser
  }

}
