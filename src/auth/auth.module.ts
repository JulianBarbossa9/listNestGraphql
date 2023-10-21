import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthResolver } from './auth.resolver';
import { jwtConstants } from './constants';

@Module({
  // controllers: [AuthController],
  providers: [AuthService, AuthResolver],
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '2hs'}
    })
  ],
  exports: [ AuthService ]
})
export class AuthModule {}
