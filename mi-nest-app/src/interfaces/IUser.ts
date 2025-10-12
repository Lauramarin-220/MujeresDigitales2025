import { RolesEnum } from "src/entities/user.entity"

/**
 * Interfaz que define la estructura de un objeto User.
 * 
 * Se utiliza para tipar los datos de usuario dentro del sistema,
 * asegurando que los objetos cumplan con las propiedades requeridas
 * en controladores, servicios y entidades.
 */
export type IUser = { 
    /** Identificador único del usuario (clave primaria). */
    id: number; 

    /** Nombre completo del usuario. */
    name: string; 

    /** Correo electrónico único asociado al usuario. */
    email: string; 

    /** Contraseña cifrada del usuario. */
    password: string; 

    /** Edad del usuario (opcional). */
    age?: number; 

    /** Rol asignado al usuario, basado en el enumerador RolesEnum. */
    role: RolesEnum; 
};
