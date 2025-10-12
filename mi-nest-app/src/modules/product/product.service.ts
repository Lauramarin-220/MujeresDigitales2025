import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from 'src/entities/product.entity';
import { CreateProductDTO } from 'src/dto/create-product.dto';
import { UpdateProductDTO } from 'src/dto/update-product.dto';

/**
 * Servicio de productos.
 * Permite crear, consultar, actualizar y desactivar productos.
 */
@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  // ✅ Obtener todos los productos activos
  async findAll(): Promise<Product[]> {
    return this.productRepository.findBy({ status: true });
  }

  // ✅ Buscar producto por ID
  async findOne(id: number): Promise<Product> {
    const product = await this.productRepository.findOneBy({ id });
    if (!product) throw new NotFoundException("Producto no encontrado");
    return product;
  }

  // ✅ Buscar producto por nombre
  async findByName(name: string): Promise<Product> {
    const product = await this.productRepository.findOne({ where: { name } });
    if (!product) throw new NotFoundException("Producto no encontrado");
    return product;
  }

  // ✅ Crear producto
  async create(data: CreateProductDTO): Promise<Product> {
    const newProduct = this.productRepository.create(data);
    return await this.productRepository.save(newProduct);
  }

  // ✅ Actualizar producto
  async update(id: number, data: UpdateProductDTO): Promise<Product> {
    const product = await this.findOne(id);
    Object.assign(product, data);
    return await this.productRepository.save(product);
  }

  // ✅ Desactivar producto (status = false)
  async disabled(id: number): Promise<{ message: string; product: Product }> {
    const product = await this.findOne(id);
    product.status = false;
    await this.productRepository.save(product);
    return {
      message: `Producto ${id} desactivado correctamente`,
      product,
    };
  }
}