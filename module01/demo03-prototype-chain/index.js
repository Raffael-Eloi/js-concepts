const assert = require('assert');
const obj = {};
const arr = [];
const fn = () => {};

// internamente, objetos literais viram funções explicitas (Number, String, Array, Function)
console.log(new Object().__proto__ === {}.__proto__);
assert.deepStrictEqual(new Object().__proto__, {}.__proto__);

// __proto__ é a referência do objeto que possui as propriedades nele
// então tudo que tem na instância do objeto vai ser direcionada para essa variável __proto__
console.log(obj.__proto__ === Object.prototype);
assert.deepStrictEqual(obj.__proto__, Object.prototype);

console.log(arr.__proto__ === Array.prototype);
assert.deepStrictEqual(arr.__proto__, Array.prototype);

console.log(fn.__proto__ === Function.prototype);
assert.deepStrictEqual(fn.__proto__, Function.prototype);

// o __proto__ de Object.prototype é null
console.log(obj.__proto__.__proto__ === null);
assert.deepStrictEqual(obj.__proto__.__proto__, null);

/******************************************************************************************************************************************************************/
function Employee() {}
Employee.prototype.salary = () => 'salary**';
console.log(Employee.prototype.salary());

function Supervisor() {}
// herda a instância de Employee
Supervisor.prototype = Object.create(Employee.prototype);
console.log(Supervisor.prototype.salary());
Supervisor.prototype.profitShare = () => 'profitShare**';
console.log(Supervisor.prototype.profitShare());

function Manager() {}
Manager.prototype = Object.create(Supervisor.prototype);
Manager.prototype.monthlyBonuses = () => 'monthlyBonuses**';

// podemos chamar via prototype, mas se tentar chamar direto dá erro!
console.log(Manager.prototype.salary());
// console.log(Manager.salary()); => ERROR
/* Se não chamar o new, primeiro __proto__ vai ser sempre a intância de Function, sem herdar nossas classes */

/* Para acessar as classes sem o new, pode acessar direto via prototype */
console.log(Manager.prototype.__proto__ === Supervisor.prototype);
assert.deepStrictEqual(Manager.prototype.__proto__, Supervisor.prototype);

/*--------------------------------------------------------------------------------------------------------------------*/

console.log(new Manager().__proto__, new Manager().salary());
// A situação abaixo é quando faz o mecanismo ir verificando o proto do proto
console.log(Supervisor.prototype === new Manager().__proto__.__proto__);

/*--------------------------------------------------------------------------------------------------------------------*/
const manager = new Manager();
console.log(manager.salary());
console.log(manager.profitShare());
console.log(manager.monthlyBonuses());

console.log(manager.__proto__);
console.log(manager.__proto__.__proto__);
console.log(manager.__proto__.__proto__.__proto__);
console.log(manager.__proto__.__proto__.__proto__.__proto__);
console.log(manager.__proto__.__proto__.__proto__.__proto__.__proto__);

assert.deepStrictEqual(manager.__proto__, Manager.prototype);
assert.deepStrictEqual(manager.__proto__.__proto__, Supervisor.prototype);
assert.deepStrictEqual(
  manager.__proto__.__proto__.__proto__,
  Employee.prototype
);
assert.deepStrictEqual(
  manager.__proto__.__proto__.__proto__.__proto__,
  Object.prototype
);
assert.deepStrictEqual(
  manager.__proto__.__proto__.__proto__.__proto__.__proto__,
  null
);

/*--------------------------------------------------------------------------------------------------------------------*/
class T1 {
  ping() {
    return 'ping';
  }
}

class T2 extends T1 {
  pong() {
    return 'pong';
  }
}
class T3 extends T2 {
  shoot() {
    return 'shoot';
  }
}

const t3 = new T3();
console.log(
  't3 inherits null?',
  t3.__proto__.__proto__.__proto__.__proto__.__proto__ === null
);
console.log(t3.ping());
console.log(t3.pong());
console.log(t3.shoot());

assert.deepStrictEqual(t3.__proto__, T3.prototype);
assert.deepStrictEqual(t3.__proto__.__proto__, T2.prototype);
assert.deepStrictEqual(t3.__proto__.__proto__.__proto__, T1.prototype);
assert.deepStrictEqual(
  t3.__proto__.__proto__.__proto__.__proto__,
  Object.prototype
);
assert.deepStrictEqual(
  t3.__proto__.__proto__.__proto__.__proto__.__proto__,
  null
);
