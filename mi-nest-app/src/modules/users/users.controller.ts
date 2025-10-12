import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDTO } from 'src/dto/create-user.dto';
import { UpdateUserDTO } from 'src/dto/update-user.dto';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { RolesEnum } from 'src/entities/user.entity';

/**
 * Controlador que gestiona las operaciones relacionadas con los usuarios.
 * 
 * Rutas base: /users
 * 
 * Protegido por JwtAuthGuard (autenticación con JWT)
 * y RolesGuard (autorización por roles).
 */
@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    /**
     * GET /users
     * Retorna todos los usuarios registrados.
     * Solo accesible por usuarios con rol ADMIN.
     */
    @Get()
    @Roles(RolesEnum.ADMIN)
    findAll() {
        return this.usersService.findAll();
    }

    /**
     * GET /users/:id
     * Busca un usuario por su ID.
     * @param id - Identificador del usuario.
     * Solo accesible por rol ADMIN.
     */
    @Get(':id')
    @Roles(RolesEnum.ADMIN)
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.usersService.findOne(id);
    }

    /**
     * POST /users
     * Crea un nuevo usuario en el sistema.
     * @param body - Datos del usuario (DTO de creación).
     * Solo accesible por rol ADMIN.
     */
    @Post()
    @Roles(RolesEnum.ADMIN)
    create(@Body() body: CreateUserDTO) {
        return this.usersService.create(body);
    }

    /**
     * PUT /users/:id
     * Actualiza los datos de un usuario existente.
     * @param id - Identificador del usuario.
     * @param body - Datos actualizados (DTO de actualización).
     * Solo accesible por rol ADMIN.
     */
    @Put(':id')
    @Roles(RolesEnum.ADMIN)
    update(@Param('id', ParseIntPipe) id: number, @Body() body: UpdateUserDTO) {
        return this.usersService.update(id, body);
    }

    /**
     * DELETE /users/:id
     * Elimina un usuario por su ID.
     * @param id - Identificador del usuario a eliminar.
     * Solo accesible por rol ADMIN.
     */
    @Delete(':id')
    @Roles(RolesEnum.ADMIN)
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.usersService.remove(id);
    }
}
