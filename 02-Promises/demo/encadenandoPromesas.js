var primerMetodo = function() {
   var promise = new Promise(function(resolve, reject){
      setTimeout(function() {
         console.log('Terminó el primer método');
         resolve({num: '123'}); //pasamos unos datos para ver como los manejamos
      }, 2000); // para simular algo asincronico hacemos un setTimeOut de 2 s
   });
   return promise;
};
// const promesa = primerMetodo() --> promesa = instancia de Promise

var segundoMetodo = function(datos) { 
// datos va a ser el objeto que devuelve el primer método {num: '123'}
   var promise = new Promise(function(resolve, reject){
      setTimeout(function() {
         console.log('Terminó el segundo método');
         resolve({nuevosDatos: datos.num + ' concatenamos texto y lo pasamos'});
      }, 2000);
   });
   return promise;
};

// primerMetodo() //devuelve una promesa
//    .then(function(data){
//       console.log(data);
//       segundoMetodo(data) // devuelve una promesa
//          .then(function(data2){
//             console.log(data2)
//          })
//    })
// FUNCIONA PERO --> ESTA NO ES LA MANERA MÁS OPTIMA DE RESOLVER PORQUE NOS ESTARÍA PASANDO LO DEL CALLBACK HELL
// ENTONCES:
// primerMetodo()
//    .then(function(data) {
//       console.log(data);
//       return segundoMetodo(data) 
//    })
//    .then(function(data1) {
//       console.log(data1);
//    })
//    .catch(function(err) {
//       console.log(err);
//    })

var tercerMetodo = function(datos) {
   var promise = new Promise(function(resolve, reject){
      setTimeout(function() {
         console.log('Terminó el tercer método');
         console.log(datos.nuevosDatos); //imprimos los datos concatenados
         resolve('hola');
      }, 3000);
   });
   return promise;
};
 
primerMetodo()
   .then(segundoMetodo)
   .then(tercerMetodo)
   .then(function(datos){
      console.log(datos); //debería ser el 'hola' que pasamos en tercerMetodo
   });

