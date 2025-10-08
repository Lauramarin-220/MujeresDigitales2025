const rl = require('readline').createInterface({input: process.stdin, output: process.stdout});

rl.question("Escribe un numero ", (n) =>{
    const numero = Number(n);

    if (isNaN(numero)) {
        console.log("Entrada invalida, no es un numero");
        return;
    } else if (numero % 2 === 0){
        console.log("es par, Bien");
    } else {
        console.log("es impar, Bien");
    }
    
   rl.close
})


