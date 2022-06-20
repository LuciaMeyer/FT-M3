var express = require('express');
var app = express();
var router = require('./routes');

//Middleware propio
app.use('/', function(req, res, next ){
    console.log('Hicieron un Request a '+ req.url);
    next();
});

// Middleware de express para leer el json del post
app.use(express.json());
app.use('/about', router);


// antes: req.url === '/' --> content-type, res.end
app.get('/', function(req, res, next){
    // res.send('hello');
    next()
});

app.get('/', function(req, res, ){
    res.send('hola');
});

app.get('/home', function(req, res){
    res.send('esto es el home');
});

//si quiero eviar información por parámetro
app.get('/welcome/:name/:lastname', (req, res) => {
    console.log(req.params);
    // let name = req.params.name;
    let {name, lastname} = req.params // --> forma con destructuring
    res.send(`Hola ${name}, ${lastname}!`)
});

app.get("/api", (req, res) => {
    var obj = {
      nombre: "prueba",
      framework: "express",
      ventaja: "serializó por nosotros",
    };
    res.json(obj);
  });

app.get('/persona', (req, res) => {
    let {name, lastname, age} = req.query;
    if(name && lastname && age) {
        res.send(`${name}, ${lastname} tiene ${age} años`)
    } else res.end('Falta información')
}); // mi ruta en el browser sería:http://localhost:3000/persona?name=lucia&lastname=meyer&age=35

//app.use(express.json())
app.post('/', (req, res)=> {
    console.log(req.body);
    let {name, lastname} = req.body;
    console.log(name, lastname);
    res.send('probando el post');  
});

app.put('/:id', (req, res) => {
    res.send(req.params.id);
});

app.get('/*', (req, res) => {
    res.send('error')
}); //si no matchea con ninguna de las rutas anteriores tira error


app.listen(3000);