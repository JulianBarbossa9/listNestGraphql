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

  update(id: number, updateItemInput: UpdateItemInput) {
    return `This action updates a #${id} item`;
  }

  remove(id: number) {
    return `This action removes a #${id} item`;
  }
}
