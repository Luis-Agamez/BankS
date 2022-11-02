import { Module } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { AccountsController } from './accounts.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AccountStream, AccountStreamSchema } from './entities/accountstream.entity';
import { AuthModule } from '../auth/auth.module';
import { AccountSaving, AccountSavingSchema } from './entities/accountsaving.entity';

@Module({
  controllers: [AccountsController],
  providers: [AccountsService],
  imports: [ AuthModule, MongooseModule.forFeature([{name:AccountStream.name,schema:AccountStreamSchema},{name:AccountSaving.name,schema:AccountSavingSchema}])],
  exports : [AccountsService]
})
export class AccountsModule {}
