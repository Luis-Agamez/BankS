import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateAccountSavingDto } from './dto/create-account-saving.dto';
import { User } from 'src/auth/entities/user.entity';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { CreateAccountStreamDto } from './dto/create-account-stream.dto';

@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Post('stream')
  @UseGuards(AuthGuard())
  createAccountStream(@Body() createAccountDto: CreateAccountStreamDto,@GetUser() user: User ) {
    return this.accountsService.createAccountStream( user.id ,createAccountDto);
  }

  @Get('stream')
  @UseGuards(AuthGuard())
  getAccountStream(@GetUser() user: User) {
    return this.accountsService.findAccountStream(user.id);
  }

  @Post('saving')
  @UseGuards(AuthGuard())
  createAccountSaving(@Body() createAccountDto: CreateAccountSavingDto,@GetUser() user: User ) {
   return this.accountsService.createAccountSaving(user.id ,createAccountDto);
  }

  @Get('saving')
  @UseGuards(AuthGuard())
  getAccountSaving(@GetUser() user: User) {
     return this.accountsService.findAccountSaving(user.id);
  }
 

  
}
