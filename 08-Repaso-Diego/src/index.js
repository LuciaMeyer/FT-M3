// Importamos módulos
const app = require("./app");
require("dotenv").config();

const PORT = process.env.PORT || 3000;

// Iniciamos el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
