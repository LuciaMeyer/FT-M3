// var fs = require('fs');



// var promise = new Promise(function(resolve, reject) {
//   // Hacer cosas acá dentro, probablemente asincrónicas.
//   fs.readFile('./archivo.txt', 'utf8', function(err, data) { 
//     if (err) {
//       return reject(Error("Algo se rompió"));
//     }
//     //console.log(data);    
//     resolve(data);
//   }); 
// });

// var nuevaDataPromesa = promise.then(function(data) {
//   var nuevaData = data.split('').splice(0, 100).join('');
//   return nuevaData;
// })

// console.log(promise);

// promise.then(function(data) {
//   console.log('se cumplió la promesa');
// })


// var lectura;
// fs.readFile('./archivo.txt', 'utf8', function(err, data) { 
//   lectura = data;
// }); 

// console.log(lectura);





//    dataBase.verifyUser(username, password, (error, userInfo) => {
//        if (error) {
//            callback(error)
//        }else{
//            dataBase.getRoles(username, (error, roles) => {
//                if (error){
//                    callback(error)
//                }else {
//                    dataBase.logAccess(username, (error) => {
//                        if (error){
//                            callback(error);
//                        }else{
//                            callback(null, userInfo, roles);
//                        }
//                    })
//                }
//            })
//        }
//    })


var fs = require('fs');



var promise = new Promise(function(resolve, reject) {
  // Hacer cosas acá dentro, probablemente asincrónicas.
  fs.readFile('./archivo.txt', 'utf8', function(err, data) { 
    if (err) {
      return reject(Error("Algo se rompió"));
    }   
    resolve(data);
  }); 
});

promise
  .then(function(data){
    console.log(data); // consologuea el dato
    return 'lucía'  // --> retorna 'lucía'
  })
  .then(function(dato1){ // --> dato1 es 'lucía'
    console.log(dato1);
  })
  .catch(function(err){
    console.log(err); // --> no entra al error
  })