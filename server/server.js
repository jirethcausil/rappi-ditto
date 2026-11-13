
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

let pedidos = [];
let solicitudes = [];

app.get("/", (req, res) => {
  res.send("¡Servidor de Rappi Ditto funcionando!");
});

app.get("/pedidos", (req, res) => {
  res.json(pedidos);
});

app.post("/pedidos", (req, res) => {
  const nuevoPedido = {
    id: Date.now(),
    ...req.body
  };

  pedidos.push(nuevoPedido);
  res.status(201).json(nuevoPedido);
});

app.post("/contacto", (req, res) => {
  const nuevaSolicitud = {
    id: Date.now(),
    ...req.body
  };

  solicitudes.push(nuevaSolicitud);
  res.status(201).json({
    mensaje: "Solicitud recibida correctamente",
    solicitud: nuevaSolicitud
  });
});

app.get("/contacto", (req, res) => {
  res.json(solicitudes);
});

app.listen(3001, () => {
  console.log("Rappi Ditto funcionando en http://localhost:3001");
});
