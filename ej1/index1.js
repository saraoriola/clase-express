const express = require("express");
const app = express();
const puerto = 3000;

app.listen("3000", () => {
  console.log(`Servidor levantado en el puerto ${puerto}`);
});
