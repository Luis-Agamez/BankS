import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { RegisteredService } from './registered.service';
import { CreateRegisteredDto } from './dto/create-registered.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { User } from 'src/auth/entities/user.entity';

@Controller('registered')
export class RegisteredController {
  constructor(private readonly registeredService: RegisteredService) {}

  @Post("stream")
  @UseGuards(AuthGuard())
  createStreamRegistered(@Body() createRegisteredDto: CreateRegisteredDto,@GetUser() user: User) {
    return this.registeredService.createRegisteredStream(user.id,createRegisteredDto.account);
  }


  @Post("saving")
  @UseGuards(AuthGuard())
  createSavingRegistered(@Body() createRegisteredDto: CreateRegisteredDto,@GetUser() user: User) {
    return this.registeredService.createRegisteredSaving(user.id,createRegisteredDto.account);
  }



  @Get("stream")
  @UseGuards(AuthGuard())
  findAllStreamAccounts(@GetUser() user: User) {
    return this.registeredService.findAllStreamAccounts(user.id);
  }

  @Get("saving")
  @UseGuards(AuthGuard())
  findAllSavingAccounts(@GetUser() user: User) {
    return this.registeredService.findAllSavingAccounts(user.id);
  }


}
