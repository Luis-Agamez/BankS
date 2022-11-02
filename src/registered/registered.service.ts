import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RegisteredSavingAccount } from './entities/registered-siving-account.entity';
import { RegisteredStreamAccount } from './entities/registered-stream-account.entity';


@Injectable()
export class RegisteredService {
  constructor(
    @InjectModel(RegisteredSavingAccount.name)
    private readonly accountSavingModel : Model<RegisteredSavingAccount>,
    @InjectModel(RegisteredStreamAccount.name)
    private readonly accountStreamModel : Model<RegisteredStreamAccount>,
  ){

  }
  async createRegisteredStream(uid : string ,account : string) {
      try {
        let registerSaved :RegisteredStreamAccount [] = null;
        registerSaved =   await this.accountStreamModel.find({user : uid}).find({ account : account});
        if( registerSaved.length > 0 ) return 
     const  register =   await this.accountStreamModel.create({ user : uid, account : account});
     console.log("creado");
     return {register};
      } catch (error) {
        this.handleExeptions(error);
      }   
  }

  async createRegisteredSaving(uid : string,account : string) {
   try {
    let registerSaved :RegisteredStreamAccount [] = null;
    registerSaved =   await this.accountSavingModel.find({user : uid}).find({ account : account});
    if(registerSaved.length > 0 )return; 
   const register = await this.accountSavingModel.create({user : uid, account : account});
   console.log("creado");
      return {register};
   } catch (error) {
    this.handleExeptions(error);
   }
  }

  


  async findAllStreamAccounts(uid : string) {
            try {
              const accountSaved = await this.accountStreamModel.find({user : uid});
              return {accountSaved};
            } catch (error) {
              this.handleExeptions(error);
            }
  }

  async findAllSavingAccounts(uid: string){
          try {
            const accountSaved = await this.accountSavingModel.find({user : uid});
            return{ accountSaved};
          } catch (error) {
            this.handleExeptions(error);
          }
  }

  handleExeptions(error : any){
    if (error.code === 11000 ) return  new BadRequestException("The register exist");

    throw new InternalServerErrorException(
      `Internal Server Error - Check server logs`,
    );
  }

 
}
