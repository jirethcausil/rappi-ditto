
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

let pedidos = [];
let solicitudes = [];
let negocios = [];

const ADMIN_USER = "admin";
const ADMIN_PASSWORD = "ditto123";

app.get("/", (req, res) => {
  res.send("¡Servidor de Rappi Ditto funcionando!");
});

app.post("/admin/login", (req, res) => {
  const { usuario, password } = req.body;

  if (usuario === ADMIN_USER && password === ADMIN_PASSWORD) {
    return res.json({
      acceso: true,
      mensaje: "Bienvenido al panel"
    });
  }

  res.status(401).json({
    acceso: false,
    mensaje: "Datos incorrectos"
  });
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

// REGISTRO DE NEGOCIOS
app.post("/negocios", (req, res) => {
  const { nombre, encargado, telefono, direccion, tipo } = req.body;

  if (!nombre || !encargado || !telefono || !direccion || !tipo) {
    return res.status(400).json({
      mensaje: "Completa todos los campos."
    });
  }

  const nuevoNegocio = {
    id: Date.now(),
    nombre,
    encargado,
    telefono,
    direccion,
    tipo,
    estado: "Pendiente"
  };

  negocios.push(nuevoNegocio);

  res.status(201).json({
    mensaje: "¡Solicitud de registro recibida!",
    negocio: nuevoNegocio
  });
});

app.get("/negocios", (req, res) => {
  res.json(negocios);
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Rappi Ditto funcionando en el puerto ${PORT}`);
});
