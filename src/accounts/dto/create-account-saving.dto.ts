import {IsString, IsNumber,} from "class-validator";

export class CreateAccountSavingDto {
    @IsNumber()
    amount: number;
}
