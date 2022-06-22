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
    
}

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

    let downstreamPromise = new $Promise(()=>{});
    this._handlerGroups.push({successCb, errorCb, downstreamPromise});

    if(this._state !== 'pending') this._callHandlers();
    return downstreamPromise;   
};


/*
1-tengo que armar un método que permita hacer lectura del arreglo mientras haya info, consumir el arreglo hasta quedar vacío
mientras una promesa todavía no se haya completado no tengo que invocarlo, o leerlo     
2-mientra tenga datos en handlerGroups --> [{sH1, eH1, pB}, {sH2, eH2, pC}, {sH3, eH3, pD}, ...]
3-tomo el primer manejador y evalúo el estado para saber como resolver cada camino {sH1, eH1, pB}
4-si el estado es fulfilled y tengo siccesscB con el try catch me aseguro que si toma el camino de eH ese error lo captura el catch y voy a ejecutar el reject de la pomesa con ese error capturado
5-si no hay error tengo 2 caminos, retorna una promesa o un valor
6- si retorna una promesa esta se resuleve al valor anterior pB = pA.then(sH, eH)
7- si retorna un valor lo resuelvo con ese valor
*/
$Promise.prototype._callHandlers = function() {
    while(this._handlerGroups.length) {
        let hd = this._handlerGroups.shift();
        if(this._state === 'fulfilled') {
            if(hd.successCb) {
                try {
                    let result = hd.successCb(this._value);
                    if(result instanceof $Promise){ 
                        return result.then(
                            sH => hd.downstreamPromise._internalResolve(sH),
                            eH => hd.downstreamPromise._internalReject(eH) 
                        )   
                    } else {
                        hd.downstreamPromise._internalResolve(result); 
                    }                 
                } catch (error) {
                    hd.downstreamPromise._internalReject(error)
                }
           } else {
            hd.downstreamPromise._internalResolve(this._value);
           }         
        } else if(this._state === 'rejected') {
            if(hd.errorCb){
                try {
                    let result = hd.errorCb(this._value);
                    if(result instanceof $Promise){
                        return result.then(
                            sH => hd.downstreamPromise._internalResolve(sH),
                            eH => hd.downstreamPromise._internalReject(eH) 
                        ); 
                    } else {
                        hd.downstreamPromise._internalResolve(result);
                    }
                } catch (error) {
                    hd.downstreamPromise._internalReject(error);
                }
            } else {
                hd.downstreamPromise._internalReject(this._value);
            }          
        }
    }
};

$Promise.prototype.catch = function(errorCb){
    return this.then(null, errorCb)
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






