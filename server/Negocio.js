const mongoose = require("mongoose");

const negocioSchema = new mongoose.Schema({
  nombre: String,
  encargado: String,
  telefono: String,
  direccion: String,
  tipo: String,
  estado: {
    type: String,
    default: "Pendiente"
  }
}, {
  timestamps: true
});

module.exports = mongoose.model("Negocio", negocioSchema);