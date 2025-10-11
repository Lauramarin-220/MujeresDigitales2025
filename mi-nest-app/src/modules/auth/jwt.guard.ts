import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

/** Guard que protege rutas mediante la estrategia JWT.
 * Verifica el token antes de permitir el acceso al endpoint. */

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}