const HistorialEstadoModel = require('../models/historialEstadoModel');
const HistorialEstadoView = require('../views/historialEstadoView');

class HistorialEstadoController {
  constructor() {
    this.modelo = new HistorialEstadoModel();
    this.vista = new HistorialEstadoView();
  }

  static async create(data) {
    const payload = createHistorialEstadoFactory(data);
    const res = await HistorialEstado.create(payload);
    return { _id: res.insertedId, ...payload };
  }

  static async listAll() {
    return await HistorialEstado.list();
  }

  static async findById(id) {
    const _id = typeof id === "string" ? new ObjectId(id) : id;
    return await HistorialEstado.findById(_id);
  }

  static async updateHistorial(id, data) {
    const _id = typeof id === "string" ? new ObjectId(id) : id;
    return await HistorialEstado.updateById(_id, data);
  }

  static async deleteHistorial(id) {
    const _id = typeof id === "string" ? new ObjectId(id) : id;
    return await HistorialEstado.deleteById(_id);
  }
}


module.exports = HistorialEstadoController;