import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateAccountSavingDto } from './dto/create-account-saving.dto';
import { InjectModel } from '@nestjs/mongoose';
import { AccountStream } from './entities/accountstream.entity';
import { Model } from 'mongoose';
import { CreateAccountStreamDto } from './dto/create-account-stream.dto';
import { AccountSaving } from './entities/accountsaving.entity';
import { Account } from './interfaces/account.interface';
@Injectable()
export class AccountsService {
  constructor(
    @InjectModel(AccountSaving.name)
    private readonly accountSavingModel : Model<AccountSaving>,
    @InjectModel(AccountStream.name)
    private readonly accountStreamModel : Model<AccountStream>,
    ){}

    
 async createAccountSaving(user:String,createAccountDto: CreateAccountSavingDto){
    try {
      const account =  await this.accountSavingModel.create({userDb : user,...createAccountDto});
      return account;
    } catch (error) {
      this.handleExeptions(error);
    }
    ;
  }


 async findAccountSaving(id : String) {
  let accounts : Account[] = [];
    try {
      const account = await this.accountSavingModel.find({userDb : id }).populate({ path: 'userDb',select:'name'});
      for(let i = 0; i < account.length; i++){
        accounts.push({account : account[i]});
      } 
      return {accounts};
    } catch (error) {
      this.handleExeptions(error);
    }
  }


  async findByIdSaving(id: string):Promise<boolean>{
   let  account : AccountSaving = null;
    try {
         account = await this.accountSavingModel.findById(id);
         if(account){
         return true;
         }
    } catch (error) {
      
    }
  }

  async findByIdStream(id: string):Promise<boolean>{
    let  account : AccountStream = null;
     try {
          account = await this.accountStreamModel.findById(id);
          if(account){
           return  true;
          }else{
            return false;
          }
     } catch (error) {
      this.handleExeptions(error);
     }
   }



      
 async createAccountStream(user: String,createAccountDto: CreateAccountStreamDto) {
  try {
    const account =   await this.accountStreamModel.create({userDb : user,...createAccountDto});
    return account;
  } catch (error) {
    this.handleExeptions(error);
  }
  ;
}


async findAccountStream(id : String) {
  let accounts : Account[] = [];
  try {
    const account =   await this.accountStreamModel.find({userDb : id }).populate({ path: 'userDb',select:'name'});

    for(let i = 0; i < account.length; i++){
      accounts.push({account : account[i]});
    } 
      
    return {accounts};
    } catch (error) {
    this.handleExeptions(error);
  }
}

async findOneStream(uid: string,id : string){
  let accounts : Account[] = [];
  try {
    const account = await this.accountStreamModel.find({userDb : uid}).find({id});
    for(let i = 0; i < account.length; i++){
      accounts.push({account : account[i]});
    } 
    return {account};
  } catch (error) {
    console.log(error);
  }
}

async findOneSaving(uid: string,id : string){
  try {
    const account = await this.accountSavingModel.find({userDb : uid}).find({id});
    return account;
  } catch (error) {
    console.log(error);
  }
}



async setCurrentValueAccountStream(origin:string,destiny :string,amount: number){
    let accountStreamO : AccountStream = null;
    let accountStreamD : AccountStream = null;
    try {
       accountStreamO = await this.accountStreamModel.findById(origin);
       accountStreamD = await this.accountStreamModel.findById(destiny);


       accountStreamO.amount = accountStreamO.amount - amount;

       accountStreamD.amount = accountStreamD.amount + amount;

       await  this.accountStreamModel.findByIdAndUpdate(accountStreamO.id,{amount : accountStreamO.amount },{new : true});
       await  this.accountStreamModel.findByIdAndUpdate(accountStreamD.id,{amount : accountStreamD.amount },{new : true});

    } catch (error) {
      this.handleExeptions(error);
    }
  

}


async setCurrentValueAccountSaving(origin:string,destiny :string,amount: number){
  let accountSavingO : AccountSaving= null;
  let accountSavingD : AccountSaving = null;
  try {
     accountSavingO = await this.accountSavingModel.findById(origin);
     accountSavingD = await this.accountSavingModel.findById(destiny);

     if(!accountSavingD) throw new BadRequestException("check the account number");

     if(!accountSavingO) throw new InternalServerErrorException("check the account number");

     accountSavingO.amount = accountSavingO.amount + amount;

     accountSavingD.amount = accountSavingD.amount - amount;

     await  this.accountSavingModel.findByIdAndUpdate(accountSavingO.id,{amount : accountSavingO.amount },{new : true});
     await  this.accountSavingModel.findByIdAndUpdate(accountSavingD.id,{amount : accountSavingD.amount },{new : true});

  } catch (error) {
    this.handleExeptions(error);
  }


}

async setCurrentValueSAvingStream(origin : string,destiny : string,amount : number){
  let accountSaving: AccountSaving= null;
  let accountStream : AccountStream = null;

  try {
    accountSaving = await this.accountSavingModel.findById(origin);
    accountStream = await this.accountStreamModel.findById(destiny);

    if(!accountStream) throw new BadRequestException("check the account number");

    if(!accountSaving) throw new InternalServerErrorException("check the account number");

    accountSaving.amount = accountSaving.amount - amount;

    accountStream.amount = accountStream.amount + amount;

    await  this.accountSavingModel.findByIdAndUpdate(accountSaving.id,{amount : accountSaving.amount },{new : true});
    await  this.accountStreamModel.findByIdAndUpdate(accountStream.id,{amount : accountStream.amount },{new : true});
  } catch (error) {
    this.handleExeptions(error);
  }
}


async setCurrentValueStreamSving(origin : string,destiny : string,amount : number){
  let accountSaving: AccountSaving= null;
  let accountStream : AccountStream = null;

  try {
    accountSaving = await this.accountSavingModel.findById(origin);
    accountStream = await this.accountStreamModel.findById(destiny);

    if(!accountStream) throw new BadRequestException("check the account number");

    if(!accountSaving) throw new InternalServerErrorException("check the account number");

    accountSaving.amount = accountSaving.amount + amount;

    accountStream.amount = accountStream.amount - amount;

    await  this.accountSavingModel.findByIdAndUpdate(accountSaving.id,{amount : accountSaving.amount },{new : true});
    await  this.accountStreamModel.findByIdAndUpdate(accountStream.id,{amount : accountStream.amount },{new : true});
  } catch (error) {
    this.handleExeptions(error);
  }
}




async setCurrentValueStreamSaving(origin : string,destiny : string,amount : number){
  let accountSaving: AccountSaving= null;
  let accountStream : AccountStream = null;

  try {
    accountSaving = await this.accountSavingModel.findById(destiny);
    accountStream = await this.accountStreamModel.findById(origin);

    if(!accountStream) throw new BadRequestException("check the account number");

    if(!accountSaving) throw new InternalServerErrorException("check the account number");

    accountSaving.amount = accountSaving.amount - amount;

    accountStream.amount = accountStream.amount + amount;

    await  this.accountSavingModel.findByIdAndUpdate(accountSaving.id,{amount : accountSaving.amount },{new : true});
    await  this.accountStreamModel.findByIdAndUpdate(accountStream.id,{amount : accountStream.amount },{new : true});
  } catch (error) {
    this.handleExeptions(error);
  }
}


async setCurrentValueStreamSAving(){
  let accountSavingO : AccountStream= null;
  let accountSavingD : AccountSaving = null;
}


private handleExeptions(error: any) {
  console.error(error);
  if (error.code === 11000 ) throw new BadRequestException("The Account exist");
  throw new InternalServerErrorException(
    `Internal Server Error - Check server logs`,
  );
}
 




}
