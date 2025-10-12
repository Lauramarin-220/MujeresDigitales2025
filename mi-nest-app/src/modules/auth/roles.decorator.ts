import { SetMetadata } from "@nestjs/common";

/**
 * Constante que define la clave usada para almacenar los roles en los metadatos del decorador.
 * Esta clave se usa luego en los guards (como RolesGuard) para obtener los roles requeridos.
 */
export const ROLES_KEY = 'roles';

/**
 * Decorador personalizado @Roles()
 * Permite asignar uno o varios roles a una ruta o controlador.
 * Usa SetMetadata para guardar los roles en los metadatos de la ruta.
 * 
 * @example
 * @Roles('admin', 'user')
 * @Get()
 * findAll() { ... }
 */
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);
