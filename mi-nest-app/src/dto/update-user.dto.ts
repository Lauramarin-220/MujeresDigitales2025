import { CreateUserDTO } from "./create-user.dto";
import { IsNotEmpty } from "class-validator";
import * as userEntity from 'src/entities/user.entity';

/**
 * DTO (Data Transfer Object) utilizado para actualizar usuarios existentes.
 * 
 * Hereda de CreateUserDTO, por lo que incluye todas las propiedades básicas 
 * de creación (name, email, password, etc.), y agrega el campo `role`
 * que permite modificar el rol del usuario.
 */
export class UpdateUserDTO extends CreateUserDTO {
    
    /**
     * Rol asignado al usuario (por ejemplo, 'admin' o 'user').
     * Es obligatorio al momento de actualizar un usuario.
     */
    @IsNotEmpty()
    role: userEntity.Roles;
}
