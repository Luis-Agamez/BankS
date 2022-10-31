import {IsString} from "class-validator";

export class CreateRegisteredDto {
    @IsString()
   account:string; 
}
