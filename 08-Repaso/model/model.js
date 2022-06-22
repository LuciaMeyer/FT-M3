const songs = [
    {name: 'Signos', idArtist: 2, duration: 1.25},   
    {name: 'Trátame Suavemente', idArtist: 2, duration: 3.02},   
];

// acá dentro voy a ir exportando distintas funciones que afecten al array songs vb
module.exports = {

    // traer todas las canciones
    showAll: function() {
        return songs;
    },

    // traer canciones por el nombre
    getByName: function(name) {
        return songs.find(s => s.name.toLowerCase() === name.toLowerCase())         
    }


}