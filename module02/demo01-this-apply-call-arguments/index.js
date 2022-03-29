'use strict';

const { watch, promises: { readFile }} = require('fs');


class File {
  watch(event, filename) {
    console.log('this', this)
    console.log('arguments', arguments)
    console.log('arguments', Array.prototype.slice.call(arguments))
    this.showContent(filename)
  }

  async showContent(filename) {
    console.log((await readFile(filename)).toString())
  }
}


// watch(__filename, async(event, filename) => {
//   console.log((await readFile(filename)).toString())
// })

const file = new File();
// dessa forma, ele ignora o 'this' da classe File
// herda o this do watch!
// watch(__filename, file.watch);

// alternativa para não herdar o this da função
// watch(__filename, (event, filename) => file.watch(event, filename));

// podemos deixar explicito qual é o contexto que a função deve seguir
// o bind retorna uma função com o 'this' que se mantém de file, ignorando o watch
// watch(__filename, file.watch.bind(file));

file.watch.call({ showContent: () => console.log('call: hey sinon!')}, null, __filename);
file.watch.apply({ showContent: () => console.log('call: hey sinon!')}, [null, __filename]);
// A diferença do call e apply é só a maneira, enquanto call chama os itens através de vírgula o apply chama através de um array


/*
Roberto S. -> 
  Erick, to com uma dúvida conceitual.

  Dado que temos a classe File com a função watch que recebe os parâmetros "event" e "filename".
  Na chamada da função dessa forma "watch(__filename, file.watch.bind(file))", não estamos passando nenhum dos parâmetros.

  Como que internamente o javascript consegue identificar o valor de filename?
  14/10/2021

Erick Wendel · Produtor @Roberto S.
vamos reavaliar a estrutura de file.watch

file.watch(event, filename)

já o fs.watch, recebe o filename, e uma função que será executada no futuro. Quando usamos o .bind, ele apenas modifica o "this" da função, ou seja, file.watch ainda possui a mesma assinatura, o .bind retorna uma cópia de file.watch somente com o this modificado

o fs.watch, quando executa seu callback passa exatamente os parametros event e filename, então como delegamos o file.watch para ele, ele passa os mesmos argumentos.

Simplificando, seria a mesma coisa fazer isso:

const callback = (event, filename) => { }
watch(__filename, callback)

então os argumentos só são reconhecidos porque o watch está enviando eles em ordem
*/

/*
  o call e o apply faz substitui a chamada da função original
  a diferença é que você define o que vai ter no "this" (no contexto) da função
  call e apply servem para chamar uma função com um contexto this pré-definido, a diferença entre um e outro é que o call voce passa a lista de argumentos por virgula e no apply voce manda um array de argumentos
*/