import { Injectable, NotFoundException } from '@nestjs/common';
import { IProducts } from 'src/interfaces';
import { CreateProductDTO } from 'src/dto/create-product.dto';

/**
 * Servicio que maneja la lógica de negocio para la gestión de productos.
 * Implementa operaciones CRUD (crear, leer, actualizar, eliminar) sobre un arreglo en memoria.
 */
@Injectable()
export class ProductsService {
  /**
   * Arreglo en memoria que simula una base de datos de productos.
   */
  private products: IProducts[] = [
    { id: 1, name: 'Botella de agua', description: 'Marca brisa', price: 2000 },
    { id: 2, name: 'Peluche', description: 'mediado color cafe', price: 300000 },
    { id: 3, name: 'Cerveza', description: 'Andina', price: 200000 },
    { id: 4, name: 'Raqueta', description: 'Raqueta mediana, perfecto a jugar PinPon', price: 500000 },
  ];

  /**
   * Obtiene todos los productos disponibles.
   * @returns {IProducts[]} Lista completa de productos.
   */
  findAll(): IProducts[] {
    return this.products;
  }

  /**
   * Busca un producto por su identificador único.
   * @param {number} id - Identificador del producto a buscar.
   * @returns {IProducts} El producto encontrado.
   * @throws {NotFoundException} Si el producto no existe.
   */
  findOne(id: number): IProducts {
    const productFind = this.products.find((product) => product.id === id);
    if (!productFind) throw new NotFoundException('Producto no encontrado');
    return productFind;
  }

  /**
   * Crea un nuevo producto y lo agrega a la lista.
   * @param {Omit<IProducts, 'id'>} product - Datos del nuevo producto (sin ID).
   * @returns {IProducts} El producto recién creado con ID asignado.
   */
  create(product: Omit<IProducts, 'id'>): IProducts {
    const newId =
      this.products.length > 0
        ? this.products[this.products.length - 1].id + 1
        : 1;

    const newProduct: IProducts = {
      id: newId,
      ...product,
    };

    this.products.push(newProduct);
    return newProduct;
  }

  /**
   * Actualiza un producto existente por su ID.
   * @param {number} id - ID del producto a actualizar.
   * @param {Omit<IProducts, 'id'>} newProduct - Datos actualizados.
   * @returns {IProducts} El producto modificado.
   * @throws {NotFoundException} Si el producto no existe.
   */
  update(id: number, newProduct: Omit<IProducts, 'id'>): IProducts {
    const product = this.findOne(id);
    Object.assign(product, newProduct);
    return product;
  }

  /**
   * Elimina un producto por su ID.
   * @param {number} id - Identificador del producto a eliminar.
   * @returns {{ message: string }} Mensaje de confirmación.
   * @throws {NotFoundException} Si el producto no existe.
   */
  remove(id: number): { message: string } {
    const product = this.products.findIndex((product) => product.id === id);
    if (product === -1) throw new NotFoundException('Producto no encontrado');
    this.products.splice(product, 1);
    return { message: `Producto con id ${id} eliminado` };
  }
}



