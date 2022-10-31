import {IsString, IsNumber,IsBoolean} from "class-validator";

export class SavedTransfer {
     @IsString()
     token: string;
}
