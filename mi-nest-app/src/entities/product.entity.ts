import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

/**
 * Entidad que representa la tabla "products" en la base de datos.
 * Define la estructura y los tipos de datos que almacenará cada producto.
 */
@Entity('products') // 👈 Nombre de la tabla en la base de datos
export class Product {

  /**
   * Identificador único autogenerado para cada producto.
   */
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * Nombre del producto.
   * No puede ser nulo.
   */
  @Column({ nullable: false })
  name: string;

  /**
   * Descripción breve del producto.
   * No puede ser nula.
   */
  @Column({ nullable: false })
  description: string;

  /**
   * Precio del producto.
   * Se almacena como un número decimal.
   */
  @Column('decimal')
  price: number;

  /**
   * Cantidad disponible en inventario.
   * No puede ser nula.
   */
  @Column({ nullable: false })
  stock: number;

  /**
   * Estado del producto (activo o inactivo).
   * Por defecto, se establece como activo (true).
   */
  @Column({ default: true })
  status: boolean;
}

