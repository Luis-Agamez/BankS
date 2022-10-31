import { Module } from '@nestjs/common';
import { TransfersService } from './transfers.service';
import { TransfersController } from './transfers.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { Transfer, TransferSchema } from './entities/transfer.entity';
import { AuthModule } from 'src/auth/auth.module';
import { JwttStarategy } from './strategies/jwtt.strategy';
import { AccountsModule } from 'src/accounts/accounts.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RegisteredModule } from '../registered/registered.module';

@Module({
  controllers: [TransfersController],
  providers: [TransfersService,JwttStarategy],
  imports : [ ConfigModule,MongooseModule.forFeature([{name:Transfer.name,schema:TransferSchema}]),
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
  }),AuthModule,AccountsModule,RegisteredModule]
})
export class TransfersModule {}
