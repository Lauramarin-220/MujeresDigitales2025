import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards, ParseIntPipe } from '@nestjs/common';
import { ProductsService } from './product.service';
import { CreateProductDTO } from 'src/dto/create-product.dto';
import { UpdateProductDTO } from 'src/dto/update-product.dto';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { ParseUpperTrimPipe } from 'src/common/Pipes/parse-uppertrim.pipe';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { RolesEnum } from 'src/entities/user.entity';

/**
 * Controlador encargado de gestionar las operaciones relacionadas con los productos.
 * Define las rutas HTTP para listar, consultar, crear, actualizar y desactivar productos.
 *
 * Rutas base: /products
 */
@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) { }

    /**
     * GET /products
     * 
     * Obtiene la lista de todos los productos registrados en la base de datos.
     * No requiere autenticación ni permisos especiales.
     * 
     * @returns Lista completa de productos.
     */
    @Get()
    encontrarTodos() {
        return this.productsService.findAll();
    }

    /**
     * GET /products/:id
     * 
     * Obtiene un producto específico por su ID.
     * Solo accesible para usuarios con roles ADMIN o USER y autenticados con JWT.
     * 
     * @param id Identificador único del producto.
     * @returns El producto correspondiente al ID proporcionado.
     */
    @Get(':id')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(RolesEnum.ADMIN, RolesEnum.USER)
    encontrarUnoPorId(@Param('id', ParseIntPipe) id: number) {
        return this.productsService.findOne(id)
    }

    /**
     * GET /products/by-name/:name
     * 
     * Busca un producto por su nombre, utilizando un Pipe personalizado
     * (`ParseUpperTrimPipe`) para limpiar y transformar el texto recibido.
     * 
     * Ejemplo: `GET http://localhost:3000/products/by-name/perro`
     * 
     * @param name Nombre del producto a buscar (en mayúsculas y sin espacios extra).
     * @returns El producto que coincida con el nombre proporcionado.
     */
    @Get('by-name/:name')
    findByName(@Param('name', ParseUpperTrimPipe) name: string) {
        return this.productsService.findByName(name);
    }

    /**
     * POST /products
     * 
     * Crea un nuevo producto en la base de datos.
     * Solo accesible para usuarios autenticados con el rol ADMIN.
     * 
     * @param body Datos del producto a crear (DTO: CreateProductDTO).
     * @returns El producto recién creado con su ID asignado.
     */
    @Post()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(RolesEnum.ADMIN)
    crear(@Body() body: CreateProductDTO) {
        return this.productsService.create(body);
    }

    /**
     * PUT /products/:id
     * 
     * Actualiza la información de un producto existente.
     * Solo accesible para usuarios con el rol ADMIN.
     * 
     * @param id ID del producto a actualizar.
     * @param body Datos actualizados (DTO: UpdateProductDTO).
     * @returns El producto actualizado con los nuevos datos.
     */
    @Put(':id')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(RolesEnum.ADMIN)
    actualizar(@Param('id', ParseIntPipe) id: number, @Body() body: UpdateProductDTO) {
        return this.productsService.update(id, body)
    }

    /**
     * DELETE /products/:id
     * 
     * Desactiva (o elimina lógicamente) un producto cambiando su estado a inactivo.
     * Solo los administradores pueden ejecutar esta acción.
     * 
     * ⚠️ Nota: Este método llama al servicio `disabled()`, el cual debe existir
     * en `ProductsService` y encargarse de actualizar el campo `status` a `false`.
     * 
     * @param id ID del producto a desactivar.
     * @returns Confirmación de que el producto fue desactivado correctamente.
     */
    @Delete(':id')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(RolesEnum.ADMIN)
    borrar(@Param('id', ParseIntPipe) id: number) {
        return this.productsService.disabled(id)
    }
}
