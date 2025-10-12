import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { LoginDTO } from 'src/dto/login.dto';
import { User } from 'src/entities/user.entity';
import { CreateUserDTO } from 'src/dto/create-user.dto';

/**
 * Servicio de autenticación del sistema.
 * 
 * Este servicio gestiona el registro, login y generación de tokens JWT
 * para los usuarios del sistema. Implementa medidas de seguridad como
 * el cifrado de contraseñas con bcrypt y validaciones de credenciales.
 */
@Injectable()
export class AuthService {
    constructor(
        /** Repositorio de la entidad User para operaciones en base de datos */
        @InjectRepository(User)
        private userRepo: Repository<User>,

        /** Servicio de NestJS para la creación y verificación de JWT */
        private jwtService: JwtService,
    ) { }

    /**
     * Registra un nuevo usuario en el sistema.
     * 
     * @param data Datos del usuario provenientes del DTO CreateUserDTO
     * @returns Mensaje de éxito y datos básicos del usuario creado.
     */
    async register(data: CreateUserDTO) {
        // Cifra la contraseña antes de guardar en la base de datos
        const hashedPassword = await bcrypt.hash(data.password, 10);

        // Crea la entidad del usuario con la contraseña cifrada
        const userCreated = this.userRepo.create({ ...data, password: hashedPassword });
        await this.userRepo.save(userCreated);

        return {
            message: 'Usuario registrado con éxito',
            user: { id: userCreated.id, email: userCreated.email }
        };
    }

    /**
     * Inicia sesión de usuario validando sus credenciales.
     * 
     * @param data Datos de inicio de sesión provenientes del DTO LoginDTO
     * @throws UnauthorizedException Si las credenciales son incorrectas.
     * @returns Objeto con el token JWT generado.
     */
    async login(data: LoginDTO) {
        // Verifica si el usuario existe por su correo electrónico
        const user = await this.userRepo.findOne({ where: { email: data.email } });

        if (!user) {
            throw new UnauthorizedException('Credenciales inválidas - EMAIL');
        }

        // Compara la contraseña ingresada con la almacenada (cifrada)
        const isPasswordValid = await bcrypt.compare(data.password, user.password);

        if (!isPasswordValid) {
            throw new UnauthorizedException('Credenciales inválidas - PASSWORD');
        }

        // Crea el payload del token JWT con los datos del usuario
        const payloadToken = {
            sub: user.id,
            name: user.name,
            email: user.email
        };

        // Genera el token firmado
        const token = await this.jwtService.signAsync(payloadToken);

        return { accessToken: token };
    }
}
