const ProyectoModel = require('../models/proyectoModel');
const ProyectoView = require('../views/proyectoView');

class ProyectoController {
  constructor() {
    this.modelo = new ProyectoModel();
    this.vista = new ProyectoView();
  }
    async crear(proyecto) {
        proyecto.fechaInicio = new Date();
        proyecto.estado = 'activo';
        proyecto.progresoPorcentaje = 0;
        proyecto.fechaFinReal = null;

        const db = await connectDB.connect();
        const result = await db.collection('Proyecto').insertOne(proyecto);
        let idObjeto = result.insertedId;
        return idObjeto;
    }

    async listar() {
        const db = await connectDB.connect();
        let arreglo = await db.collection('Proyecto').find().toArray();
        return arreglo;
    }

    async buscarPorId(id) {
        const db = await connectDB.connect();
        const proyecto = await db.collection('Proyecto').findOne({ _id: new ObjectId(id) });
        return proyecto;
    }

    async actualizar(id, datosActualizados) {
        const db = await connectDB.connect();
        const result = await db.collection('Proyecto').updateOne(
            { _id: new ObjectId(id) },
            { $set: datosActualizados }
        );
        return result.modifiedCount;
    }

    async eliminar(id) {
        const db = await connectDB.connect();
        const result = await db.collection('Proyecto').deleteOne({ _id: new ObjectId(id) });
        return result.deletedCount;
    }
}

module.exports = ProyectoController;