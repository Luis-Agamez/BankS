import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AccountsService } from 'src/accounts/accounts.service';
import { RegisteredService } from 'src/registered/registered.service';
import { CreateTransferDto } from './dto/create-transfer.dto';
import { DataTransferDto } from './dto/data-transfer.dto';
import { Transfer } from './entities/transfer.entity';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class TransfersService {

  constructor(
    @InjectModel(Transfer.name)
    private readonly transferModel: Model<Transfer>,
    private readonly jwtService: JwtService,
    private readonly accountsService: AccountsService,
    private readonly registeredService: RegisteredService
  ) { }

  create(user: string, createTransferDto: CreateTransferDto) {
    const token = this.getJwtToken({ accountorigin: createTransferDto.accountorigin, accountdestiny: createTransferDto.accountdestiny, origin: createTransferDto.origin, id: user, us: createTransferDto.us, amount: createTransferDto.amount });
    return token;
  }

  async saved(data: DataTransferDto, token: string) {
    try {

      const find = await this.transferModel.find({ token });

      if (find.length > 0) return new BadRequestException("the transaction has already been made");

      const findSivings = await this.accountsService.findByIdSaving(data.accountorigin);
      const findStream = await this.accountsService.findByIdStream(data.accountdestiny);

      if (findSivings && findStream) {
        this.accountsService.setCurrentValueSAvingStream(data.accountorigin, data.accountdestiny, data.amount);
        const transfer = await this.transferModel.create({ accountorigin: data.accountorigin, accountdestiny: data.accountdestiny, send: data.id, us: data.us, token: token, origin: data.origin, amount: data.amount });
        this.registeredService.createRegisteredStream(data.id, data.accountdestiny);
        return { transfer };
      }

      if (!findSivings && !findStream) {
        this.accountsService.setCurrentValueStreamSving(data.accountdestiny, data.accountorigin, data.amount);
        const transfer = await this.transferModel.create({ accountorigin: data.accountorigin, accountdestiny: data.accountdestiny, send: data.id, us: data.us, token: token, origin: data.origin, amount: data.amount });
        this.registeredService.createRegisteredSaving(data.id, data.accountdestiny);
        return { transfer };
      }


      if (data.origin === 'notregistered') {
        let result = this.accountsService.findByIdSaving(data.accountdestiny);
        if (result) {
          data.origin = "saving";
        }
      }

      if (data.origin === 'notregistered') {
        let result = this.accountsService.findByIdStream(data.accountdestiny);
        if (result) {
          data.origin = "stream";
        }
      }

      if (data.origin === 'notregistered') return new BadRequestException("the Account not Exist");


      const transfer = await this.transferModel.create({ accountorigin: data.accountorigin, accountdestiny: data.accountdestiny, send: data.id, us: data.us, token: token, origin: data.origin, amount: data.amount });

      if (data.origin === "stream") {
        this.registeredService.createRegisteredStream(data.id, data.accountdestiny);
        this.accountsService.setCurrentValueAccountStream(data.accountorigin, data.accountdestiny, data.amount);
       
      }

      if (data.origin === "saving") {
        this.registeredService.createRegisteredSaving(data.id, data.accountdestiny);
       this.accountsService.setCurrentValueAccountSaving(data.accountdestiny, data.accountorigin, data.amount);
      console.log("saving");
       
      }

      return { transfer };
    } catch (error) {
      this.handleExeptions(error);
    }

  }


  async getTransfersSend(id: string) {
    try {
      const results = await this.transferModel.find({ send: id });
      return { results };
    } catch (error) {

    }
  }


  async getTransfersReceive(id: string) {
    try {
      const results = await this.transferModel.find({ accountdestiny: id });
      return { results };
    } catch (error) {

    }
  }




  private getJwtToken(payload: JwtPayload) {
    const token = this.jwtService.sign(payload);
    return token;
  }


  private handleExeptions(error: any): never {
    console.log(error.code);
  throw new InternalServerErrorException(`Internal Server Error - Check server logs`,);
  }

}
