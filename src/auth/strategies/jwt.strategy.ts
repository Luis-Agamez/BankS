import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { InjectModel } from "@nestjs/mongoose";
import { PassportStrategy } from "@nestjs/passport";
import { Model } from "mongoose";
import { Strategy, ExtractJwt } from "passport-jwt";
import { User } from "../entities/user.entity";
import { JwtPayload } from "../interfaces/jwt-payload.interface";

@Injectable()
export class JwtStarategy extends PassportStrategy(Strategy) {
    constructor(@InjectModel(User.name)
    private readonly userModel: Model<User>,
    configService: ConfigService
    ) {
        super({
            secretOrKey: configService.get('JWT_SECRET'),
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
        });
    }

    async validate(payload: JwtPayload) {
        let user: User = null;
        const { id } = payload;
        try {
            user = await this.userModel.findOne({ id });
            if (!user) throw new UnauthorizedException('Credentials are not valid ()')
            return user;
        } catch (error) {
            console.log(error);
        }
    }



}