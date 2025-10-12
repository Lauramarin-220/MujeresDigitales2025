/**
 * Interfaz que define la estructura de un objeto Product.
 * 
 * Se utiliza para tipar datos que representan productos dentro del sistema,
 * garantizando consistencia entre las operaciones del backend (servicios, controladores y repositorios).
 */
export type IProducts = {
  /** Identificador único del producto (clave primaria). */
  id: number;

  /** Nombre del producto. */
  name: string;

  /** Descripción detallada del producto. */
  description: string;

  /** Precio del producto (en formato numérico). */
  price: number;

  /** Cantidad disponible en inventario. */
  stock: number;

  /** Estado del producto: true = activo, false = deshabilitado. */
  status: boolean;
};