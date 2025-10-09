import { MigrationInterface, QueryRunner } from "typeorm";

export class SeedProducts1759973888811 implements MigrationInterface {
    name = 'SeedProducts1759973888811'

    public async up(queryRunner: QueryRunner): Promise<void> {
         await queryRunner.query(`
      INSERT INTO products (id ,name, description, price, stock) VALUES
      ('1','Colchon', 'Tamaño king', 3000000, 50),
      ('2','Servillestas', 'Paquete de 20 unidades', 20000, 110),
      ('3','Celular', 'Marca Honor', 1100000, 40)
    `)  
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
                  DELETE FROM products WHERE id IN (1, 2, 3)
            `)  
    }

}
