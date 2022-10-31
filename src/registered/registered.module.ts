import { Module } from '@nestjs/common';
import { RegisteredService } from './registered.service';
import { RegisteredController } from './registered.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { RegisteredSavingAccount, RegisteredSavingAccountSchema } from './entities/registered-siving-account.entity';
import { AuthModule } from 'src/auth/auth.module';
import { RegisteredStreamAccount, RegisteredStreamAccountSchema } from './entities/registered-stream-account.entity';

@Module({
  controllers: [RegisteredController],
  providers: [RegisteredService],
  imports: [ MongooseModule.forFeature([{name:RegisteredSavingAccount.name,schema:RegisteredSavingAccountSchema},{name:RegisteredStreamAccount.name,schema:RegisteredStreamAccountSchema}]), AuthModule],
  exports :[RegisteredService]
})
export class RegisteredModule {}
