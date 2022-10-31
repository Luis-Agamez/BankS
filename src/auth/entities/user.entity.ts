import { Document } from "mongoose"
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class User extends Document {
    @Prop({index : true})
    name: string;
    
    @Prop({
        unique: true,
        index : true
    })
    email: string;
    
    @Prop()
    password : string

    @Prop({default : false})
    activeStream: boolean;

    @Prop({default : false})
    activeSavings: boolean;
   
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.method('toJSON', function () {
    const { password, __v, ...object } = this.toObject();
    return object;
  });
  
