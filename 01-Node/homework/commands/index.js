const fs = require('fs');
const request = require('request');

// con la función done() hago el refactory, por eso todo lo otro queda comentado

module.exports = {
    date: function(arg, done){
        // process.stdout.write(Date());
        done(Date());
    },
    pwd: function(arg, done){
        // process.stdout.write(process.env.PWD);
        done(process.env.PWD);
    },
    ls: function(arg, done){
        fs.readdir('.', function(err, files) {
            if (err) throw err;
            let strFiles = '';
            files.forEach(function(file) {
            //   process.stdout.write(file.toString() + "\n");
            strFiles = strFiles + file + '\n'
            })
            // process.stdout.write('\nprompt > ');
            done(strFiles);
        })
    },
    echo: function(arg, done) {
        // process.stdout.write(arg.join(' '));
        done(arg.join(' '));
    },
    cat: function(arg, done) {
        fs.readFile(arg[0], function(err, file){
            if(err) throw err;
            // process.stdout.write(file);
            // process.stdout.write('\nprompt > ');
            done(file);
        })
    },
    head: function(arg, done) {
        fs.readFile(arg[0], 'utf-8', function(err, data){
            if(err) throw err;
            // con split separa por salto de linea en un array ['linea1', 'linea2'...] con el slice me devuelve de la 0 a la 10
            // y lo vuelvo a juntar con el join también por salto de linea
            // process.stdout.write(data.split('\n').slice(0, 10).join('\n'));
            // process.stdout.write('\nprompt > ');
            done(data.split('\n').slice(0, 10).join('\n'));
        })
    },
    tail: function(arg, done) {
        fs.readFile(arg[0], 'utf-8', function(err, data){
            if(err) throw err;
            // process.stdout.write(data.split('\n').slice(-10).join('\n')); // el número negativo toma de atrás para adelante
            // process.stdout.write('\nprompt > ');
            done(data.split('\n').slice(-10).join('\n'));
        })
    },
    curl: function(arg, done){
        request(arg[0], function(err, response, body){ // request recibe 3 arg el 2do es opcional, function de callback recibe esos 3 también
            if(err) throw err;
            // process.stdout.write(body);
            // process.stdout.write('\nprompt > ');
            done(body);
        })
    }
}