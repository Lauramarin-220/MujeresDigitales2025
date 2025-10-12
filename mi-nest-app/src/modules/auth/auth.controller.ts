import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO } from 'src/dto/login.dto';
import { CreateUserDTO } from 'src/dto/create-user.dto';
import { JwtAuthGuard } from './jwt.guard';

/**
 * Controlador encargado de gestionar la autenticación de usuarios.
 * Rutas base: /auth
 * 
 * Incluye funcionalidades para registrar, autenticar y obtener el perfil
 * del usuario autenticado.
 */
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    /**
     * POST /auth/register
     * Registra un nuevo usuario en el sistema.
     * 
     * @param data - Datos del nuevo usuario (nombre, email, contraseña, etc.).
     * @returns Objeto con la información del usuario creado.
     */
    @Post('register')
    register(@Body() data: CreateUserDTO) {
        return this.authService.register(data);
    }

    /**
     * POST /auth/login
     * Inicia sesión de un usuario existente.
     * 
     * @param data - Credenciales de acceso (email y contraseña).
     * @returns Token JWT y datos del usuario autenticado.
     */
    @Post('login')
    login(@Body() data: LoginDTO) {
        return this.authService.login(data);
    }
    
    /**
     * GET /auth/profile
     * Devuelve la información del usuario autenticado mediante JWT.
     * 
     * @param req - Solicitud HTTP con los datos del usuario autenticado.
     * @returns Datos del perfil del usuario actual.
     */
    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
        return req.user;
    }
}
