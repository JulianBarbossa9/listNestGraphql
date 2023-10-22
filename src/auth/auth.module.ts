import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { UsersModule } from 'src/users/users.module';

@Module({
  providers: [AuthResolver, AuthService],
  imports: [ UsersModule ] //Import the module we need, also we can import only the service
})
export class AuthModule {}
