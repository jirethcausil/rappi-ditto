const mongoose = require("mongoose");

const pedidoSchema = new mongoose.Schema({}, {
  strict: false,
  timestamps: true
});

module.exports = mongoose.model("Pedido", pedidoSchema);