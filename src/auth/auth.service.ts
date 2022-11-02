import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { compareSync, hashSync } from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
    private readonly jwtService: JwtService,
  ) { }

  async create(createUserDto: CreateUserDto) {
    createUserDto.password = hashSync(createUserDto.password, 12);
    try {
      const user = await this.userModel.create(createUserDto);
      return { user, token: this.getJwtToken({ id: user.id }) };
    } catch (error) {
      this.handleExeptions(error);
    }
  }

  async login(loginUserDto: LoginUserDto) {
    let user: User = null;
    const { password, email } = loginUserDto;
    try {
      user = await this.userModel.findOne({ email });
    } catch (error) {
      this.handleExeptions(error);
    }
    if (!user)
      throw new UnauthorizedException('Credentials are not valid (email)');

    if (!compareSync(password, user.password))
      throw new UnauthorizedException('Credentials are not valid (password)');

    delete user.password;
    return { user, token: this.getJwtToken({ id: user.id }) };
  }


  async setActiveAccountStream(uid  : string){
    try {
     let user : User = null;
     user = await this.userModel.findById(uid);
     if(!user.activeStream){
      await this.userModel.findByIdAndUpdate(uid,{activeStream : true },{new : true})
     }else{
      return 
     }
     
    } catch (error) {  
      this.handleExeptions(error);
    }
  }

  async setActiveAccountSaving(uid  : string){
    try {
      let user : User = null;
      user = await this.userModel.findById(uid);
      if(!user.activeSavings){
       await this.userModel.findByIdAndUpdate(uid,{ activeSavings : true },{new : true})
      }else{
       return 
      }
      
     } catch (error) {  
       this.handleExeptions(error);
     }
  }

  async renewToken(user: User) {
  let userDb: User = null;
     try {
      userDb = await this.userModel.findById(user.id);
     if(!userDb) throw new UnauthorizedException();

     } catch (error) {
      this.handleExeptions(error);
     }

    return { user : userDb, token: this.getJwtToken({ id: user.id }) };
  }

  private getJwtToken(payload: JwtPayload) {
    const token = this.jwtService.sign(payload);
    return token;
  }

  private handleExeptions(error: any) {
    if (error.code === 11000 ) throw new BadRequestException("The email exist");
    throw new InternalServerErrorException(
      `Internal Server Error - Check server logs`,
    );
  }
}
