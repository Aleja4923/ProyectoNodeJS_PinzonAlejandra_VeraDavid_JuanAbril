// /models/clienteModel.js
const { getDb } = require('../config/mongo');
const crypto = require('crypto');

class ClienteModel {
  constructor() {
    this.collection = 'clientes';
  }

  async getCollection() {
    const db = await getDb();
    return db.collection(this.collection);
  }

  async autenticar(correo, password) {
    const col = await this.getCollection();
    const hash = this.#hashPassword(password);

    const cliente = await col.findOne({ correo, password: hash });
    if (!cliente) throw new Error('Credenciales inválidas');
    return cliente;
  }

  async crear(data) {
    const col = await this.getCollection();

    const total = await col.countDocuments();
    const nuevo = {
      clienteId: total + 1,
      nombre: data.nombre,
      empresa: data.empresa,
      correo: data.correo,
      telefono: data.telefono,
      estado: data.estado || 'activo',
      password: this.#hashPassword(data.password),
      fechaRegistro: new Date()
    };

    const result = await col.insertOne(nuevo);
    return nuevo.clienteId;
  }

  async listar() {
    const col = await this.getCollection();
    return await col.find().toArray();
  }

  async actualizar(id, data) {
    const col = await this.getCollection();
    await col.updateOne(
      { clienteId: Number(id) },
      { $set: { ...data } }
    );
  }

  async eliminar(id) {
    const col = await this.getCollection();
    await col.deleteOne({ clienteId: Number(id) });
  }

  #hashPassword(password) {
    return crypto.createHash('sha256').update(password).digest('hex');
  }
}

module.exports = ClienteModel;
