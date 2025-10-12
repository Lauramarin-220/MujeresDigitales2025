import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

/**
 * Definición de tipos y enumeraciones para los roles de usuario.
 */
export type Roles = 'admin' | 'user';

/**
 * Enumeración que define los posibles roles dentro del sistema.
 * Se utiliza para mantener consistencia en el manejo de roles.
 */
export enum RolesEnum {
    ADMIN = 'admin',
    USER = 'user'
}

/**
 * Entidad que representa la tabla "user" en la base de datos.
 * Define la estructura y los atributos que tendrá cada usuario registrado.
 */
@Entity()
export class User {

    /**
     * Identificador único del usuario.
     * Se genera automáticamente por la base de datos.
     */
    @PrimaryGeneratedColumn()
    id: number;

    /**
     * Nombre completo del usuario.
     * Este campo es obligatorio.
     */
    @Column({ nullable: false })
    name: string;

    /**
     * Correo electrónico del usuario.
     * Es único y obligatorio (no pueden existir dos iguales).
     */
    @Column({ nullable: false, unique: true })
    email: string;

    /**
     * Contraseña cifrada del usuario.
     * Este campo es obligatorio.
     */
    @Column()
    password: string;

    /**
     * Edad del usuario.
     * Campo opcional, puede ser nulo.
     */
    @Column({ nullable: true })
    age?: number;

    /**
     * Rol asignado al usuario dentro del sistema.
     * Por defecto, todo usuario nuevo tiene el rol "user".
     */
    @Column({ default: RolesEnum.USER })
    role: Roles;
}
