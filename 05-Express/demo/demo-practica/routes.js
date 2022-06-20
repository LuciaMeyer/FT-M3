// con este archivo voy a modularizar
var express = require('express');
var router = express.Router();

// defino mis rutas
router.get('/', (req, res) => {
    res.send('Hola estoy en /About/');
});
router.get('/lucia', (req, res) => {
    res.send('about lucia');
});
router.get('/:id', (req, res) => {
    res.send(req.params.id);
});

//voy a exportar a router para poder usarlo fuera en nuestro index
module.exports = router;


 