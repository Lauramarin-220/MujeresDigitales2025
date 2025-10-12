import { CreateProductDTO } from "./create-product.dto";
import { IsNotEmpty, IsBoolean } from "class-validator";

/**
 * DTO (Data Transfer Object) utilizado para actualizar productos existentes.
 * 
 * Hereda de CreateProductDTO para reutilizar las propiedades base
 * (name, description, price, stock) y agrega el campo `status`
 * que indica si el producto está activo o deshabilitado.
 */
export class UpdateProductDTO extends CreateProductDTO {
    
    /**
     * Estado del producto.
     * - true → activo
     * - false → deshabilitado
     * 
     * Se valida que sea un valor booleano y que no esté vacío.
     */
    @IsNotEmpty()
    @IsBoolean()
    status: boolean;
}
