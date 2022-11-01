import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateRegisteredDto } from './dto/create-registered.dto';
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
    const result =  this.findByIdRegistredStream(account);
    if(result) throw new  BadRequestException("Account Registered");
      try {
     const  register =   await this.accountStreamModel.create({ user : uid, account : account});
     return {register};
      } catch (error) {
        this.handleExeptions(error);
      }   
  }

  async createRegisteredSaving(uid : string,account : string) {
    const  result =  this.findByIdRegistredSaving(account);
    if(result) throw new  BadRequestException("Account Registered");
     try {
    const register = await this.accountSavingModel.create({user : uid, account : account});
    return {register};
     } catch (error) {
      this.handleExeptions(error);
     }

  }

  async findByIdRegistredSaving(id: string):Promise<boolean>{
   let  register : RegisteredSavingAccount = null;
     try {
       register =  await this.accountSavingModel.findOne({account : id});
     } catch (error) {
       this.handleExeptions(error);
     }
    if(register) {
      return true;
    }else{
      return false;
    }
  }
  async findByIdRegistredStream(id: string):Promise<boolean>{
    let register : RegisteredStreamAccount = null;
      try {
          register =   await this.accountStreamModel.findById({account : id});
        } catch (error) {
           this.handleExeptions(error);
        }
    if(register) {
      return true;
    }else{
      return false;
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
    if (error.code === 11000 ) throw new BadRequestException("The register exist");

    throw new InternalServerErrorException(
      `Internal Server Error - Check server logs`,
    );
  }

 
}
