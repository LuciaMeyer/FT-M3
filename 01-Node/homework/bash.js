const commands = require('./commands');

// con la función done() hago el refactory

const done = function(output) {
    process.stdout.write(output);
    process.stdout.write('\nprompt > ');
 }

// Output un prompt
process.stdout.write('prompt > ');
// El evento stdin 'data' se dispara cuando el user escribe una línea
process.stdin.on('data', function (data) {
    var arg = data.toString().trim().split(' ') // echo hola lu --> ['echo', 'hola', 'lu']
    var cmd = arg.shift() // cmd = echo  arg = ['hola', 'lu']
    if(commands[cmd]) {
        commands[cmd](arg, done)
    } else {
        process.stdout.write(`${cmd} not found`);
    }
    
});





