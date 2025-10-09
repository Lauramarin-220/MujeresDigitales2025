import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'; // 👈 importa TypeOrmModule
import { ProductsController } from './product.controller';
import { ProductsService } from './product.service';
import { Product } from '../../entities/product.entity'; // 👈 importa la entidad

@Module({
  imports: [TypeOrmModule.forFeature([Product])], // 👈 registra la entidad aquí
  controllers: [ProductsController],
  providers: [ProductsService],
  exports: [ProductsService], // 👈 opcional, si otro módulo lo usa
})
export class ProductsModule {}
