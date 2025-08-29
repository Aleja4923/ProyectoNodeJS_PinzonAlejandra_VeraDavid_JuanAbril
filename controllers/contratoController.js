const ContratoModel = require('../models/contratoModel');
const ContratoView = require('../views/contratoView');

class ContratoController {
  constructor() {
    this.modelo = new ContratoModel();
    this.vista = new ContratoView();
  }

  static async create(data) {
    const payload = createContratoFactory(data);
    const res = await Contrato.create(payload);
    return { _id: res.insertedId, ...payload };
  }

  static async listAll() {
    return await Contrato.list();
  }

  static async findById(id) {
    const _id = typeof id === "string" ? new ObjectId(id) : id;
    return await Contrato.findById(_id);
  }

  static async updateContrato(id, data) {
    const _id = typeof id === "string" ? new ObjectId(id) : id;
    return await Contrato.updateById(_id, data);
  }

  static async deleteContrato(id) {
    const _id = typeof id === "string" ? new ObjectId(id) : id;
    return await Contrato.deleteById(_id);
  }
}


module.exports = ContratoController;