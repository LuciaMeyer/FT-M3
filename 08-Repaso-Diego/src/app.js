// Importamos módulos
const express = require("express");
const routes = require("./routes");
// Creamos una instancia de express y la llamamos app
const app = express();

// Aplicamos los middlewares
app.use(express.json());

// Aplicamos las rutas
app.use("/users", routes.routerUsers);
app.use("/todos", routes.routerTodos);

// Exportamos la app
module.exports = app;
