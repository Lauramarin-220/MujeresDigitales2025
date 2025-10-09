import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])], // repositorio de la entidad
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService, TypeOrmModule], // 👈 EXPORTA para otros módulos
})
export class UsersModule {}