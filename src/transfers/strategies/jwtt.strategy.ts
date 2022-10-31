import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { PassportStrategy } from "@nestjs/passport";
import { ConfigService } from "@nestjs/config";
import { Model } from "mongoose";
import { Strategy, ExtractJwt } from "passport-jwt";
import { User } from "src/auth/entities/user.entity";
import { JwtPayload } from "../interfaces/jwt-payload.interface";


@Injectable()
export class JwttStarategy extends PassportStrategy(Strategy) {
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
            if (!user) throw new UnauthorizedException('User invalid');

            return payload;
        } catch (error) {
            console.log(error);
        }
    }

}