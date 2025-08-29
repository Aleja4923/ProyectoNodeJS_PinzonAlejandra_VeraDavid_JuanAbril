const ProyectoModel = require('../models/proyectoModel');
const ProyectoView = require('../views/proyectoView');

class ProyectoController {
  constructor() {
    this.modelo = new ProyectoModel();
    this.vista = new ProyectoView();
  }

  static async create(data) {
    const payload = createProyectoFactory(data);
    const res = await Proyecto.create(payload);
    return { _id: res.insertedId, ...payload };
  }

  static async listAll() {
    return await Proyecto.list();
  }

  static async findById(id) {
    const _id = typeof id === "string" ? new ObjectId(id) : id;
    return await Proyecto.findById(_id);
  }

  static async updateProyecto(id, data) {
    const _id = typeof id === "string" ? new ObjectId(id) : id;
    return await Proyecto.updateById(_id, data);
  }

  static async deleteProyecto(id) {
    const _id = typeof id === "string" ? new ObjectId(id) : id;
    return await Proyecto.deleteById(_id);
  }
}

module.exports = ProyectoController;