import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { TransfersService } from './transfers.service';
import { CreateTransferDto } from './dto/create-transfer.dto';
import { User } from 'src/auth/entities/user.entity';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { GetData } from './decorators/get-payload.decorator';
import { DataTransferDto } from './dto/data-transfer.dto';
import { SavedTransfer } from './dto/saved-tranfer.dto';


@Controller('transfers')
export class TransfersController {
  constructor(private readonly transfersService: TransfersService) {}

  @Post()
  @UseGuards(AuthGuard())
  create(@Body() createTransferDto: CreateTransferDto,@GetUser() user: User) {
    return this.transfersService.create(user.id,createTransferDto);
  }

  @Post('saved')
  @UseGuards(AuthGuard())
  saved(@GetData() data:DataTransferDto,@Body() saveTransfer : SavedTransfer) {
   return this.transfersService.saved(data,saveTransfer.token);
  }

  @Get("send")
  @UseGuards(AuthGuard())
  findSend(@GetUser() user: User){
      return   this.transfersService.getTransfersSend(user.id);
  }


  @Get("receive")
  @UseGuards(AuthGuard())
  findReceive(@GetUser() user: User){
      return   this.transfersService.getTransfersSend(user.id);
  }

}
