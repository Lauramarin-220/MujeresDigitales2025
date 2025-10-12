import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { User } from 'src/entities/user.entity';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './jwt.strategy';

/**
 * Módulo de autenticación del sistema.
 * 
 * Se encarga de gestionar el registro, login y validación de usuarios
 * mediante el uso de JWT (JSON Web Tokens) y estrategias de Passport.
 */
@Module({
  imports: [
    /** 
     * ConfigModule:
     * Permite acceder a variables de entorno de forma global.
     */
    ConfigModule.forRoot({ isGlobal: true }),

    /** 
     * TypeOrmModule:
     * Conecta la entidad User con el repositorio de TypeORM
     * para realizar operaciones de base de datos.
     */
    TypeOrmModule.forFeature([User]),

    /** 
     * PassportModule:
     * Configura la estrategia predeterminada de autenticación 'jwt'.
     */
    PassportModule.register({ defaultStrategy: 'jwt' }),

    /** 
     * JwtModule:
     * Registra el módulo JWT de manera asíncrona usando variables de entorno.
     * Se configura la clave secreta y el tiempo de expiración del token.
     */
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('JWT_SECRET_KEY'),
        signOptions: { expiresIn: config.get<string>('JWT_EXPIRES_IN') || '1h' }
      })
    })
  ],

  /** Proveedores disponibles dentro del módulo */
  providers: [AuthService, JwtStrategy],

  /** Controladores que manejan las rutas relacionadas a autenticación */
  controllers: [AuthController]
})
export class AuthModule { }
