import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('Products') // 👈 el nombre debe coincidir con el que usas en las migraciones
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column('decimal')
  price: number;

  @Column()
  stock: number;
}
