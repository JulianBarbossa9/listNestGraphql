import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

@Module({
  providers: [AuthResolver, AuthService],
  imports: [ 
    UsersModule,
    ConfigModule,
    PassportModule.register({ defaultStrategy: 'jwt'}),
    JwtModule.registerAsync({
      imports: [ ConfigModule ],
      inject: [ ConfigService ],
      useFactory: ( configService: ConfigService) => ({
        
        // console.log(configService.get('JWT_SECRET'))
        
          secret: configService.get('JWT_SECRET'),
          signOptions: {
            expiresIn: '3h'
          }
      })
    })
    
  ] //Import the module we need, also we can import only the service
})
export class AuthModule {}
