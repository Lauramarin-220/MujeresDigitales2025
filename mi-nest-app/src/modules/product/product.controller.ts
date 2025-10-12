import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { ParseUpperTrimPipe } from 'src/common/Pipes/parse-uppertrim.pipe';
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
   @UseGuards(JwtAuthGuard)
  encontrarUnoPorId(@Param('id') id: string) {
    return this.productsService.findOne(Number(id));
  }

  @Get('by-name/:name') //La ruta es http://localhost:3000/products/by-name/perro
    findByName(@Param('name', ParseUpperTrimPipe) name: string) {
        return this.productsService.findByName(name);
    }

  /**
   * POST /products
   * Crea un nuevo producto.
   * @param {CreateProductDTO} body - Datos del producto (sin ID).
   */
  @Post()
   @UseGuards(JwtAuthGuard)
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
  @UseGuards(JwtAuthGuard)
  actualizar(@Param('id') id: string, @Body() body: UpdateProductDTO) {
    return this.productsService.update(Number(id), body);
  }

  /**
   * DELETE /products/:id
   * Elimina un producto por su ID.
   * @param {string} id - ID del producto a eliminar.
   */
  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  borrar(@Param('id') id: string) {
    return this.productsService.remove(Number(id));
  }
}
