// entrada y salida por consola
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Funciones de operaciones
function sumar(a, b) {
  return a + b;
}
function restar(a, b) {
  return a - b;
}
function multiplicar(a, b) {
  return a * b;
}
function dividir(a, b) {
  if (b === 0) return "Error: no se puede dividir entre 0";
  return a / b;
}

// Menú
console.log("=== CALCULADORA ===");
console.log("1. Suma");
console.log("2. Resta");
console.log("3. Multiplicación");
console.log("4. División");

rl.question("Elige una opción (1-4): ", (opcion) => {
  rl.question("Escribe el primer número: ", (num1) => {
    rl.question("Escribe el segundo número: ", (num2) => {
      const a = parseFloat(num1);
      const b = parseFloat(num2);

      let resultado;
      switch (opcion) {
        case "1":
          resultado = sumar(a, b);
          break;
        case "2":
          resultado = restar(a, b);
          break;
        case "3":
          resultado = multiplicar(a, b);
          break;
        case "4":
          resultado = dividir(a, b);
          break;
        default:
          resultado = "Opción no válida";
      }

      console.log("Resultado:", resultado);
      rl.close();
    });
  });
});