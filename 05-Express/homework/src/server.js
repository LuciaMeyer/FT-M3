// const bodyParser = require("body-parser");
const { json } = require("body-parser");
const express = require("express");
const STATUS_USER_ERROR = 422;
let posts = [];
const server = express();

server.use(express.json())

server.post('/posts', (req, res) => {

    const { author, title, contents } = req.body
    if(author && title && contents) {
        const obj = {author, title, contents, id: +posts.length };
        posts.push(obj);
        return res.json(obj);
    } else res.status(STATUS_USER_ERROR).json({ 
        error: "No se recibieron los parámetros necesarios para crear el Post"
    });        
});

server.post('/posts/author/:author', (req, res) => {
    const { title, contents } = req.body;
    const { author } = req.params;
    if(author && title && contents) {
        const obj = {author, title, contents, id: +posts.length };
        posts.push(obj);
        console.log(posts);
        return res.json(obj);
    } else res.status(STATUS_USER_ERROR).json({ 
        error: "No se recibieron los parámetros necesarios para crear el Post"
    }); 
});
  
server.get('/posts', (req, res) => {
    const { term } = req.query;
    if(!term) return res.json(posts);
    const filterPosts = posts.filter(p => p.title.includes(term) || p.contents.includes(term)); // [{}.{}.{}]
    res.json(filterPosts);
});

server.get('/posts/:author', (req, res) => {
    const { author } = req.params;
    const filterAuthor = posts.filter(p => p.author === author);
    if(!filterAuthor.length) return res.status(STATUS_USER_ERROR).json({ 
        error: "No existe ningun post del autor indicado"
    }); 
    res.json(filterAuthor);
});

server.get('/posts/:author/:title', (req, res) => {
    const { author, title } = req.params;
    const filterAuthorAndTitle = posts.filter(p => p.author === author && p.title === title);
    if(!filterAuthorAndTitle.length) return res.status(STATUS_USER_ERROR).json({ 
        error: "No existe ningun post con dicho titulo y autor indicado"
    }); 
    res.json(filterAuthorAndTitle);
});

server.put('/posts', (req, res) => {
    const { id, title, contents } = req.body;
    if(!id || !title || !contents) return res.status(STATUS_USER_ERROR).json({
        error: "No se recibieron los parámetros necesarios para modificar el Post"
    });
    const postId = posts.find(p => p.id === id);
    if(!postId) return res.status(STATUS_USER_ERROR).json({
        error: "No existe post con el id indicado"
    });
    postId.title = title;
    postId.contents = contents;
    res.json(postId);
});

server.delete('/posts', (req, res) => {
    const { id } = req.body;
    if(!id) return res.status(STATUS_USER_ERROR).json({
        error: 'No se recibió id'
    });
    const postById = posts.find(p => p.id === id);
    if(!postById) return res.status(STATUS_USER_ERROR).json({
        error: "No existe post con el id indicado "
    });
    posts = posts.filter(p => p.id !== id);
    res.json({ success: true });
});

server.delete('/author', (req, res) => {
    const { author } = req.body;
    console.log(author);
    if(!author) return res.status(STATUS_USER_ERROR).json({error: "No se recibió author"});
    const deletedPost = posts.filter(p => p.author === author);
    if(!deletedPost.length) return res.status(STATUS_USER_ERROR).json({error: "No existe el autor indicado"});
    res.json(deletedPost);
});

server.get('/*', (req, res) => {
    res.send('No existe la ruta indicada')
});



module.exports = { posts, server };
