import { Prop,SchemaFactory,Schema, } from "@nestjs/mongoose";
import { Document, Types } from 'mongoose';
import { AccountSaving } from "src/accounts/entities/accountsaving.entity";
import { User } from "src/auth/entities/user.entity";

@Schema()
export class RegisteredSavingAccount {
    @Prop({type : [Types.ObjectId],ref : User.name ,required :true})
     user : string;

     @Prop({ type : [Types.ObjectId],ref : AccountSaving.name ,required :true})
     account : string;
}


export const RegisteredSavingAccountSchema = SchemaFactory.createForClass(RegisteredSavingAccount);

RegisteredSavingAccountSchema.method('toJSON', function () {
    const {__v, ...object } = this.toObject();
    return object;
  });
  