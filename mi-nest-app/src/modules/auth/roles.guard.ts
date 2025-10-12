import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { ROLES_KEY } from "./roles.decorator";

/**
 * Guard encargado de verificar si el usuario autenticado
 * posee los roles necesarios para acceder a una ruta protegida.
 * 
 * Usa el decorador @Roles() para obtener los roles requeridos
 * desde los metadatos definidos en el controlador o método.
 */
@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    /**
     * Método que determina si el usuario puede acceder a la ruta.
     * @param context - Contexto de ejecución que contiene la solicitud HTTP.
     * @returns true si el usuario tiene permiso, de lo contrario lanza excepción.
     */
    canActivate(context: ExecutionContext): boolean {
        // Obtiene los roles requeridos desde los metadatos del decorador @Roles()
        const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);

        if (!requiredRoles) return true; // Si no hay roles definidos, permite el acceso

        const { user } = context.switchToHttp().getRequest();

        if (!user) throw new ForbiddenException('Usuario no autenticado');

        // Verifica si el rol del usuario está entre los roles requeridos
        if (!requiredRoles.includes(user.role)) {
            throw new ForbiddenException('Su rol no tiene permisos para acceder a esta ruta');
        }

        return true;
    }
}
