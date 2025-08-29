const FacturaModel = require('../models/facturaModel');
const FacturaView = require('../views/facturaView');

class FacturaController {
  constructor() {
    this.modelo = new FacturaModel();
    this.vista = new FacturaView();
  }

  static async create(data) {
    const payload = createFacturaFactory(data);
    const res = await Factura.create(payload);
    return { _id: res.insertedId, ...payload };
  }

  static async listAll() {
    return await Factura.list();
  }

  static async findById(id) {
    const _id = typeof id === "string" ? new ObjectId(id) : id;
    return await Factura.findById(_id);
  }

  static async updateFactura(id, data) {
    const _id = typeof id === "string" ? new ObjectId(id) : id;
    return await Factura.updateById(_id, data);
  }

  static async deleteFactura(id) {
    const _id = typeof id === "string" ? new ObjectId(id) : id;
    return await Factura.deleteById(_id);
  }
}


module.exports = FacturaController;