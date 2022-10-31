import {IsString, IsNumber,} from "class-validator";

export class CreateAccountStreamDto {
    @IsNumber()
    amount: number;
}
