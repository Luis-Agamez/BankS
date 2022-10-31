import {IsString, IsNumber,IsBoolean} from "class-validator";

export class CreateTransferDto {

    @IsString()
    accountorigin: string; 

    @IsString()
    accountdestiny: string; 

    @IsString()
    origin: string; 

    @IsBoolean()
    us :boolean;

    @IsNumber()
    amount: number;
}
