import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateItemInput, UpdateItemInput } from './dto/inputs';
import { Item } from './entities/item.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ItemsService {

  //With this we can make a CRUD
  constructor(
    @InjectRepository(Item)
    private readonly itemsRepository: Repository<Item>
  ){}
  
  async create(createItemInput: CreateItemInput): Promise<Item> {
    const newItem = this.itemsRepository.create( createItemInput )
    await this.itemsRepository.save(newItem)
    return newItem
  }

  async findAll(): Promise<Item[]> {
    //Whith this return all te items in db
    return this.itemsRepository.find();
  }

  async findOne(id: string): Promise<Item> {
    const item = await this.itemsRepository.findOneBy({ id })

    if (!item) throw new NotFoundException(`Item with id #${id} not found`)
    return item
  }

  async update(id: string, updateItemInput: UpdateItemInput): Promise<Item> {
    
    const item = await this.itemsRepository.preload( updateItemInput )
    
    if(!item) throw new NotFoundException(`Item with id #${id} not found`)

    return this.itemsRepository.save( item )
  }

  async remove(id: string): Promise<Item> {

    const item = await this.findOne(id)
    await this.itemsRepository.remove(item)
    return {...item, id}//This a copy of the item deleted if we don't do that apperar a bad request in graphql becouse id is undefined

  }
}
