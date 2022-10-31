import { Prop,SchemaFactory,Schema, } from "@nestjs/mongoose";
import { Document, Types } from 'mongoose';
import { User } from "src/auth/entities/user.entity";

@Schema()
export class Transfer extends Document{

    @Prop({required : true})
    accountorigin : string;

    @Prop({type : [Types.ObjectId],ref : User.name , required : true})
    accountdestiny : string;

    @Prop({type : [Types.ObjectId],ref : User.name ,required :true})
    send : string;
   
    @Prop({required : true})
     origin: string;


    @Prop({required : true, unique : true})
    token: string;

     @Prop({required : true})
     us: boolean;

    @Prop({required : true})
    amount: number;
}


export const TransferSchema = SchemaFactory.createForClass(Transfer);

TransferSchema.method('toJSON', function () {
    const {__v, ...object } = this.toObject();
    return object;
  });
  