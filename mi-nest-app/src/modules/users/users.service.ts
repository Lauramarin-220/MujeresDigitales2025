import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDTO } from 'src/dto/create-user.dto';
import { UpdateUserDTO } from 'src/dto/update-user.dto';
import { User } from 'src/entities/user.entity';
import { IUser } from 'src/interfaces';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

/**
 * @class UsersService
 * @description
 * Servicio encargado de gestionar las operaciones relacionadas con los usuarios.
 * Implementa las funciones CRUD usando TypeORM y maneja la lógica de negocio
 * antes de comunicarse con la base de datos.
 */
@Injectable()
export class UsersService {

  /**
   * Inyección del repositorio de usuarios para acceder a la base de datos.
   * @param usersRepo - Repositorio de la entidad User proporcionado por TypeORM.
   */
  constructor(
    @InjectRepository(User)
    private usersRepo: Repository<User>,
  ) {}

  /**
   * Obtiene todos los usuarios registrados en la base de datos.
   * @returns {Promise<User[]>} Lista completa de usuarios.
   */
  findAll(): Promise<User[]> {
    return this.usersRepo.find();
  }

  /**
   * Busca un usuario específico por su identificador único (ID).
   * Lanza una excepción si el usuario no existe.
   *
   * @param {number} id - Identificador único del usuario.
   * @returns {Promise<User>} El usuario encontrado.
   * @throws {NotFoundException} Si no existe un usuario con el ID indicado.
   */
  async findOne(id: number): Promise<User> {
    const userFind = await this.usersRepo.findOne({ where: { id } });
    if (!userFind) throw new NotFoundException('Usuario no encontrado');
    return userFind;
  }

  /**
   * Crea un nuevo usuario en la base de datos.
   *
   * @param {CreateUserDTO} newUser - Datos del usuario a crear.
   * @returns {Promise<User>} Usuario recién creado.
   */
  create(newUser: CreateUserDTO): Promise<User> {
    const userCreated = this.usersRepo.create(newUser);
    return this.usersRepo.save(userCreated);
  }

  /**
   * Actualiza los datos de un usuario existente, incluyendo el cifrado de la contraseña.
   *
   * @param {number} id - ID del usuario a actualizar.
   * @param {UpdateUserDTO} updateUser - Datos actualizados del usuario.
   * @returns {Promise<User>} Usuario actualizado.
   * @throws {NotFoundException} Si el usuario no existe.
   */
  async update(id: number, updateUser: UpdateUserDTO): Promise<User> {
    // 🔒 Se cifra la contraseña antes de actualizar
    const hashedPassword = await bcrypt.hash(updateUser.password, 10);
    await this.usersRepo.update(id, { ...updateUser, password: hashedPassword });
    return this.findOne(id);
  }

  /**
   * Elimina un usuario de la base de datos por su ID.
   *
   * @param {number} id - Identificador único del usuario a eliminar.
   * @returns {Promise<{ message: string }>} Mensaje de confirmación.
   * @throws {NotFoundException} Si el usuario no existe.
   */
  async remove(id: number): Promise<{ message: string }> {
    const result = await this.usersRepo.delete(id);
    if (result.affected === 0)
      throw new NotFoundException(`Usuario con id ${id} no encontrado`);

    return { message: `El usuario con id ${id} fue eliminado correctamente` };
  }
}
