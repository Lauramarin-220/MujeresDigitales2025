import { Injectable } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { PassportStrategy } from "@nestjs/passport"
import { Strategy, ExtractJwt } from 'passport-jwt'

/** Estrategia JWT que valida el token enviado en el header Authorization. 
 * Usa la clave del .env (JWT_SECRET_KEY) y devuelve los datos del usuario. */

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(private configService: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get<string>('JWT_SECRET_KEY')
        })
    }

    async validate(payload: any) {
        return { userId: payload.sub, email: payload.email, role: payload.role }
    }

}