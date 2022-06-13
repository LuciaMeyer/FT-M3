var fs  = require("fs")
var http  = require("http")

// Escribí acá tu servidor
http.createServer(function(req, res){
    fs.readFile(`./images${req.url}`, function(err, data){
        if(err){
            res.writeHead(404, {'Content-Type' : 'text/plain'})
            res.end('imagen not found')
        } else {
            res.writeHead(200, {'Content-Type' : 'image/jpeg'})
            res.end(data)
        }
    })

}).listen(1337, '127.0.0.1');