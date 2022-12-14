import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './entities/user.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStarategy } from './strategies/jwt.strategy';
@Module({
  controllers: [AuthController],
  providers: [AuthService,JwtStarategy],
  imports: [
    ConfigModule,
    MongooseModule.forFeature([{name:User.name,schema:UserSchema}]),
    PassportModule.register({defaultStrategy :'jwt'}),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject : [ConfigService],
      useFactory : (configService : ConfigService) => {
        return  {
          secret: configService.get('JWT_SECRET'),signOptions:{
               expiresIn:'2h'
        }}
      }, 
    })
  ],
  exports : [MongooseModule,JwtModule,PassportModule,JwtStarategy,AuthService]
})
export class AuthModule {}
