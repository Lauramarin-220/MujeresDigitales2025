import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ProductsService } from './product.service';
import { CreateProductDTO } from 'src/dto/create-product.dto';
import { UpdateProductDTO } from 'src/dto/update-product.dto';

/**
 * Controlador encargado de manejar las peticiones HTTP relacionadas con productos.
 * Rutas: /products
 */
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  /**
   * GET /products
   * Retorna todos los productos disponibles.
   */
  @Get()
  encontrarTodos() {
    return this.productsService.findAll();
  }

  /**
   * GET /products/:id
   * Busca un producto por su ID.
   * @param {string} id - ID del producto a buscar.
   */
  @Get(':id')
  encontrarUnoPorId(@Param('id') id: string) {
    return this.productsService.findOne(Number(id));
  }

  /**
   * POST /products
   * Crea un nuevo producto.
   * @param {CreateProductDTO} body - Datos del producto (sin ID).
   */
  @Post()
  crear(@Body() body: CreateProductDTO) {
    return this.productsService.create(body);
  }

  /**
   * PUT /products/:id
   * Actualiza un producto existente.
   * @param {string} id - ID del producto a actualizar.
   * @param {UpdateProductDTO} body - Datos actualizados.
   */
  @Put(':id')
  actualizar(@Param('id') id: string, @Body() body: UpdateProductDTO) {
    return this.productsService.update(Number(id), body);
  }

  /**
   * DELETE /products/:id
   * Elimina un producto por su ID.
   * @param {string} id - ID del producto a eliminar.
   */
  @Delete(':id')
  borrar(@Param('id') id: string) {
    return this.productsService.remove(Number(id));
  }
}
