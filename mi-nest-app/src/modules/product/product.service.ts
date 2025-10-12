import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from 'src/entities/product.entity';
import { CreateProductDTO } from 'src/dto/create-product.dto';
import { UpdateProductDTO } from 'src/dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  // ✅ Obtener todos los productos
  async findAll(): Promise<Product[]> {
    return this.productRepository.find();
  }

  // ✅ Buscar por ID
  async findOne(id: number): Promise<Product> {
    const product = await this.productRepository.findOneBy({ id });
    if (!product) throw new NotFoundException('Producto no encontrado');
    return product;
  }
  // ✅ Buscar por nombre
    findByName(name: string) {
        const productFind = this.productRepository.findOne({ where: { name }});
        if (!productFind) throw new NotFoundException('Producto no encontrado');
        return productFind;
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

  // ✅ Eliminar producto
  async remove(id: number): Promise<{ message: string }> {
    const result = await this.productRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Producto no encontrado');
    }
    return { message: `Producto con id ${id} eliminado` };
  }
}
