const EntregableModel = require('../models/entregableModel');
const EntregableView = require('../views/entregableView');

class EntregableController {
  constructor() {
    this.modelo = new EntregableModel();
    this.vista = new EntregableView();
  }

  static async create(data) {
    const payload = createEntregableFactory(data);
    const res = await Entregable.create(payload);
    return { _id: res.insertedId, ...payload };
  }

  static async listAll() {
    return await Entregable.list();
  }

  static async findById(id) {
    const _id = typeof id === "string" ? new ObjectId(id) : id;
    return await Entregable.findById(_id);
  }

  static async updateEntregable(id, data) {
    const _id = typeof id === "string" ? new ObjectId(id) : id;
    return await Entregable.updateById(_id, data);
  }

  static async deleteEntregable(id) {
    const _id = typeof id === "string" ? new ObjectId(id) : id;
    return await Entregable.deleteById(_id);
  }
}


module.exports = EntregableController;