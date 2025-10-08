import { Module } from '@nestjs/common';
import { ProductsController } from './product.controller';
import { ProductsService } from './product.service';

/**
 * Módulo de productos.
 * 
 * Se encarga de agrupar el controlador y el servicio relacionados
 * con la gestión de productos dentro de la aplicación.
 * 
 * - controllers: definen las rutas HTTP (ProductsController).
 * - providers: definen la lógica de negocio y servicios inyectables (ProductsService).
 */
@Module({
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
