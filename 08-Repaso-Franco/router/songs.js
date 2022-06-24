const express = require('express');
const router = express.Router();
const { showAll, getByName } = require('../model/model.js');

// Todas las rutas que defina dentro de este router si o si van a tener antes el /songs...

// GET /songs
router.get('/', (req, res) => {
    res.send('Ingresaste a la sección de canciones')
});

// GET por parametros
router.get('/:name', (req, res) => {
    const { name } = req.params;
    res.json(getByName(name));
});


// GET /songs/all --> no va a entrar acá porque matchea con :name y busca el nombre all, tendria que tener otra ruta
router.get('/all', (req, res) => {
    res.json(showAll())
})




module.exports = router;