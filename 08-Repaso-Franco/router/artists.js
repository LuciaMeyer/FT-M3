const express = require('express');
const router = express.Router();

// Todas las rutas que defina dentro de este router si o si van a tener antes el /artists
router.get('/', (req, res) => {
    res.send('Ingresaste a la sección de artistas')
})

module.exports = router;