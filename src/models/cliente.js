const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const clienteSchema = new mongoose.Schema({
  localidad: String,
  codigo_postal: String,
  producto: String,
  tipo_cliente: String,
  user: { type:Schema.Types.ObjectId, ref: 'User' }
});

const clienteModel = mongoose.model("Cliente", clienteSchema);

module.exports = clienteModel;
