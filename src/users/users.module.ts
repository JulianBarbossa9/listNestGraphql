import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

@Module({
  providers: [UsersResolver, UsersService],
  imports: [
    TypeOrmModule.forFeature([ User ]) //Import he model to show in db
  ],
  exports: [
    // TypeOrmModule,
    UsersService //With this we say in another modules we can use userService
  ]
})
export class UsersModule {}
