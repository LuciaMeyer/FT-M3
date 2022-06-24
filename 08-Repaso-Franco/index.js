const express = require('express');
const app = express();
const morgan = require('morgan');
const songsRouter = require('./router/songs');
const artistsRouter = require('./router/artists');
const SECRET_PSW = 'Secret';

app.use(morgan('dev'));
app.use(express.json());


//ejemplo de uso de next() --> ver uso de funcion en linea 33
function protectRoute(req, res, next) {
    const { secret } = req.body;
    if(secret === SECRET_PSW) {
        next();
    } else {
        res.status(401).send('contraseña incorrecta')
    }
}

// Solamemente los request que arranquen con /songs
app.use('/songs', songsRouter);

// Solamemente los request que arranquen con /artists
app.use('/artists', artistsRouter);

 
app.post('/', (req, res) => {
    res.send('Bienvenidos al repaso del M3')
});

app.get('/admin', protectRoute, (req, res) => {
    res.send('soy admin');
});

// se usa tirar un error cuando se requiere a una ruta que no machea con ninguna
app.use((req, res) => {
    res.send('error!')
})

app.listen(3000, () => console.log('Server running on port 3000'))