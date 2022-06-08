const fs = require('fs');

// METODO ALL y MAP!! 

function readFile(filename, callback) {
	var randExtraTime = Math.random() * 200;
	setTimeout(function () {
		fs.readFile(filename, function (err, buffer) {
			if (err) callback(err);
			else callback(null, buffer.toString());
		});
	}, randExtraTime);
};

function promisifiedReadFile (filename) {
	return new Promise(function (resolve, reject) {
		readFile(filename, function (err, str) {
			if (err) reject(err);
			else resolve(str);
		});
	});
};

// con el método Promise.all() me aseguro que me retorne los valores una vez que las 3 promesas terminaron
// const promise1 = promisifiedReadFile('archivo.txt')
// const promise2 = promisifiedReadFile('archivo2.txt')
// const promise2 = promisifiedReadFile('archivo3.txt')

// Promise.all([promise1, promise2, promise3])
//     .then(values => {
//         console.log(values)
//     })

// CÓMO HAGO PARA CONVERTIR UN ARREGLO DE STRINGS A UN ARREGLO DE PROMESAS??
const fileNames = ['archivo.txt', 'archivo2.txt', 'archivo3.txt'];
const arrPromises = fileNames.map(fn => promisifiedReadFile(fn))
// [promise1, promise2, promise2]

Promise.all(arrPromises)
    .then(values => {
        console.log(values)
    })