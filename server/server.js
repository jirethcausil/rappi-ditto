
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");
const Pedido = require("./Pedido");
const Solicitud = require("./Solicitud");
const Negocio = require("./Negocio");
const app = express();

app.use(cors());
app.use(express.json());

// Almacenamiento temporal


// Acceso de demostración
const ADMIN_USER = "admin";
const ADMIN_PASSWORD = "ditto123";

// Ruta principal
app.get("/", (req, res) => {
  res.send("¡Servidor de Rappi Ditto funcionando!");
});

// Inicio de sesión administrativo
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

// PEDIDOS
app.get("/pedidos", async (req, res) => {
  try {
    const pedidos = await Pedido.find();
    res.json(pedidos);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener pedidos" });
  }
});

app.post("/pedidos", async (req, res) => {
  try {
    const nuevoPedido = await Pedido.create(req.body);
    res.status(201).json(nuevoPedido);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al guardar el pedido" });
  }
});
// CONTACTO
app.get("/contacto", async (req, res) => {
  try {
    const solicitudes = await Solicitud.find();
    res.json(solicitudes);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener solicitudes" });
  }
});

app.post("/contacto", async (req, res) => {
  try {
    const nuevaSolicitud = await Solicitud.create(req.body);

    res.status(201).json({
      mensaje: "Solicitud recibida correctamente",
      solicitud: nuevaSolicitud
    });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al guardar solicitud" });
  }
});

// REGISTRO DE NEGOCIOS
app.get("/negocios", async (req, res) => {
  try {
    const negocios = await Negocio.find();
    res.json(negocios);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener negocios" });
  }
});

app.post("/negocios", async (req, res) => {
  try {
    const { nombre, encargado, telefono, direccion, tipo } = req.body;

    if (!nombre || !encargado || !telefono || !direccion || !tipo) {
      return res.status(400).json({
        mensaje: "Completa todos los campos."
      });
    }

    const nuevoNegocio = await Negocio.create({
      nombre,
      encargado,
      telefono,
      direccion,
      tipo,
      estado: "Pendiente"
    });

    res.status(201).json({
      mensaje: "¡Solicitud de registro recibida!",
      negocio: nuevoNegocio
    });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al guardar negocio" });
  }
})
// INICIAR SERVIDOR
const PORT = process.env.PORT || 3001;

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB conectado correctamente");

    app.listen(PORT, () => {
      console.log(`Rappi Ditto funcionando en el puerto ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error al conectar MongoDB:", error.message);
  });