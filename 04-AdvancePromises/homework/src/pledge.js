'use strict';
/*----------------------------------------------------------------
Promises Workshop: construye la libreria de ES6 promises, pledge.js
----------------------------------------------------------------*/
// // TU CÓDIGO AQUÍ:
function $Promise (executor) {
    this._state = 'pending'
    executor(this._internalResolve.bind(this), this._internalReject.bind(this))
}
$Promise.prototype._internalResolve = function() {
    if (this._state === 'pending') {
        this._state = "fulfilled"

        }
}
$Promise.prototype._internalReject = function() {

}

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
