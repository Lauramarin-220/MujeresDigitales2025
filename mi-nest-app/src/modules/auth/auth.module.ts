import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersService } from '../users/users.service';
import { UsersModule } from '../users/users.module'; // 👈 importar UsersModule

@Module({
  imports: [UsersModule], // 👈 necesario para acceder a UsersService
  providers: [AuthService, UsersService],
  controllers: [AuthController]
})
export class AuthModule {}