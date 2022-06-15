'use strict';
/*----------------------------------------------------------------
Promises Workshop: construye la libreria de ES6 promises, pledge.js
----------------------------------------------------------------*/






/*
1- function $Promise (executor) {} ES NUESTRO CONSTRUCTOR DE PROMESAS, TIENE PROPIEDADES Y MÉTODOS
2- executor sería el argumento que recibe una promesa, let p1 = new Promise(function(resolve, reject))
3- ese resolve y reject son los métodos _internalResolve y _internalReject pueden almacenar datos, evalúan el estado de la promesa y lo cambian según corresponda pasando el valor
4- this._handlerGroups es una propiedad del constructor donde el then va a mandar objetos sH o eH. Es lo que tiene que ejecutar a futuro, es la cola de lo que debe hacer una vez que la promesa se complete, todavía no sabe que valor toma la promesa
5- en executor bindeo el this para que cuando sean invocadas las funciones sepa a qué hace referencia sus propiedades this._state, this._value, etc. Pude haberlo hecho con función flecha
*/

function $Promise (executor) {
    if(typeof executor !== 'function') throw new TypeError('executor must be a function')
    this._state = 'pending';
    this._handlerGroups = []
    executor(this._internalResolve.bind(this), this._internalReject.bind(this))
    
};

$Promise.prototype._internalResolve = function(value) {
    if (this._state === 'pending') {
        this._state = 'fulfilled';
        this._value = value;
        this._callHandlers();
    }      
};

$Promise.prototype._internalReject = function(reason) {
    if (this._state === 'pending') {
        this._state = 'rejected';
        this._value = reason;
        this._callHandlers();
    }
};

// el método then es el define qué hacer en un caso o en el otro, recibe 2 funciones
$Promise.prototype.then = function(successCb, errorCb){
    if(typeof successCb !== 'function') successCb = false;
    if(typeof errorCb !== 'function') errorCb = false;
    this._handlerGroups.push({successCb, errorCb})
    if(this._state !== 'pending') this._callHandlers();
};


// mientras una promesa todavía no se haya completado no tengo que invocar, o leer el earreglo de sH o eH por eso tengo que armar un método que permita hacer esa lectura mientras haya info
$Promise.prototype._callHandlers = function() {
    while(this._handlerGroups.length){
        let handler = this._handlerGroups.shift() //  tomo el primero [{successCb1, errorCb1}, {successCb2, errorCb2}, ...]
        if(this._state === 'fulfilled'){
            if(handler.successCb){
                handler.successCb(this._value)
            }
        } else if(this._state === 'rejected'){
            if(handler.errorCb){
                handler.errorCb(this._value)
            }
        }
    }
};

$Promise.prototype.catch = function(errorCb){
    this.then(null, errorCb)
};



module.exports = $Promise;
/*-------------------------------------------------------
El spec fue diseñado para funcionar con Test'Em, por lo tanto no necesitamos
realmente usar module.exports. Pero aquí está para referencia:

module.exports = $Promise;

Entonces en proyectos Node podemos esribir cosas como estas:

var Promise = require('pledge');
…
var promise = new Promise(function (resolve, reject) { … });
--------------------------------------------------------*/






