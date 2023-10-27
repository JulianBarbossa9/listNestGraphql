import { join } from 'path';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { ItemsModule } from './items/items.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot(),

    GraphQLModule.forRootAsync({
      driver: ApolloDriver,
      imports: [ AuthModule ],
      inject: [ JwtService ],
      //useFactory is used to inject services, if you don't need to inject services you can use the object directly
      useFactory: async (jwtService: JwtService) => {
        return { //This is the object that will be passed to the ApolloServer constructor so this is the objct that you can use to configure ApolloServer
          playground: false,
          autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
          plugins: [
            ApolloServerPluginLandingPageLocalDefault()
          ],
          context({ req }) {

            /**
             * This is a validation of the token, if the token is valid the user can access to the graphql playground, fort this reason is recommended create a rest endpoint to login/sigin and get the token
             */
            // console.log(req.headers.authorization)//Show the authorization header
            
          //   const token = req.headers.authorization?.split(' ')[1]//Get the token from the authorization header
          //   // console.log(payload)//Show the id and another data of the user, 
          //   /**
          //    * Also you can see the JwtService
          //   */
          //  // console.log(JwtService)
          //  if(!token) throw Error('No token provided')
           
          //  const payload = jwtService.decode(token)
          //  if(!payload) throw Error('Invalid token')
          }
        }
      }
    }),

    // GraphQLModule.forRoot<ApolloDriverConfig>({
    //   driver: ApolloDriver,
    //   // debug: false,
    //   playground: false,
    //   autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    //   plugins: [
    //     ApolloServerPluginLandingPageLocalDefault()
    //   ]
    // }),

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      synchronize: true,
      autoLoadEntities: true,
    }),
    
    ItemsModule,
    
    UsersModule,
    
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
