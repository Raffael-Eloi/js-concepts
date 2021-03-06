const { deepStrictEqual } = require('assert');

let counter = 0;
let counter2 = counter;
counter2++;
console.log(counter);
console.log(counter2);

let numero1 = 10;
let numero2 = numero1;
numero1 = numero1 + 50;
numero1;
numero2;

const item = { counter: 0 };
const item2 = item;

// tipo primitivo gera uma cópia em memória
deepStrictEqual(counter, 0);
deepStrictEqual(counter2, 1);

//tipo de referência, copia o endereço de memória e aponta para o mesmo lugar
item2.counter++;
deepStrictEqual(item, { counter: 1 });
item.counter++;
deepStrictEqual(item2, { counter: 2 });
