const mongoose = require("mongoose");

const solicitudSchema = new mongoose.Schema({}, {
  strict: false,
  timestamps: true
});

module.exports = mongoose.model("Solicitud", solicitudSchema);
