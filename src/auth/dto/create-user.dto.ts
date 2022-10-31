import { IsEmail, IsString, Matches, MaxLength, MinLength,IsBoolean } from "class-validator";
export class CreateUserDto {
    

    @IsString()
    @IsEmail()
    name: string;


    @IsString()
    @IsEmail()
    email: string;
    
    @IsString()
    @MinLength(6)
    @MaxLength(50)
    password: string;
    
    @IsBoolean()
    activeStream : boolean ;

    @IsBoolean()
    activeSavings : boolean ;
   
}
