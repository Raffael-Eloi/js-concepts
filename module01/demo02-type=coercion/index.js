console.log(true + 2);

console.log(true - 2);

console.log('21' + true);

console.log('21' - true);

console.log(9999999999999999);

console.log(0.1 + 0.2);

console.log(0.1 + 0.2 === 0.3);

console.log(3 > 2);

console.log(2 > 1);

console.log(3 > 2 > 1);

// console.log('21' -- 1); result => 22

console.log('1' == 1);
console.log('1' === 1); //Não faz coercão implícita

console.log('B' + 'a' + +'a' + 'a');

/**********************************************************************************************************************************************************/

console.log(String(123));
console.log(123 + '');

console.assert(String(123) === '123', 'explicit convertion to string');
console.assert(123 + '' === '123', 'explicit convertion to string');

if (null || 1) {
  console.log('ae!');
}

if ('hello' || 1) {
  console.log('ae2!');
}

const r = 'hello' || 1;
console.log(r); // Sempre retorna o primeiro se os 2 forem true

console.assert(
  ('hello' || 123) === 'hello',
  '|| returns the first element if the two items are true!'
);

console.assert(
  ('hello' && 123) === 123,
  '|| returns the last element if the two items are true!'
);

/**********************************************************************************************************************************************************/

const item = {
  name: 'RaffaelEloi',
  age: 21,
  // string: 1 se não for primitivo, chama o valueOf
  toString() {
    return `Name ${this.name}, Age: ${this.age}`;
  },
  // number: 1 se não for primitivo, chama o toString
  valueOf() {
    return { hey: 'dude' };
    //return 007;
  },
  // ele tem prioridade na parada!
  [Symbol.toPrimitive](coertionType) {
    console.log('trying to convert to', coertionType);
    const types = {
      string: JSON.stringify(this),
      number: '0007'
    };

    return types[coertionType] || types.string;
  }
};

console.log('toString', String(item));

// Vai retornar NaN pois o toString retornou a string
console.log('valueOf', Number(item));

//depois de adicionar o toPrimitive
console.log('toString', String(item));
console.log('valueOf', Number(item));

// Chama a conversão default
console.log('Date', new Date(item));

console.assert(item + 0 === '{"name":"RaffaelEloi","age":21}0');

console.log('!!item is true?', !!item);

console.assert('Ae'.concat(item) === 'Ae{"name":"RaffaelEloi","age":21}');
console.log('string.concat', 'Ae'.concat(item));

console.log('implicit + explicit coercion (using ==) ->', item == String(item));
console.assert(item == String(item));

const item2 = { ...item, name: 'Zézin', age: 20 };
console.log('New Object', item2);
