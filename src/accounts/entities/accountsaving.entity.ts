import { Prop,SchemaFactory,Schema, } from "@nestjs/mongoose";
import { Document, Types } from 'mongoose';
import { User } from "src/auth/entities/user.entity";

@Schema()
export class AccountSaving extends Document {
    @Prop({type : [Types.ObjectId],ref : User.name ,required :true})
    userDb : string;
    @Prop({required : true})
    amount: number;
}

export const AccountSavingSchema = SchemaFactory.createForClass(AccountSaving);

AccountSavingSchema.method('toJSON', function () {
    const {__v, ...object } = this.toObject();
    return object;
  });
  