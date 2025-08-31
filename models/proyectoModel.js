const {ObjectId} = require('mongodb');
const connectDB = require('../db');

class proyectoModel {
    constructor() {
        this.schema = {
            clienteId: 'string',
            propuestaId: 'string',
            fechaInicio: 'object',
            fechaFinEstimada: 'object',
            fechaFinReal: 'object',
            estado: 'string',
            progresoPorcentaje: 'number'
        }
    }
    
    validar(proyecto) {
        const requiredFields = ['clienteId', 'propuestaId', 'fechaInicio', 'fechaFinEstimada', 'estado', 'progresoPorcentaje'];
        for(let campo of requiredFields) {
            if(typeof proyecto[campo] !== this.schema[campo]) {
                return false;
            }
        }
        return true;
    }
    
    async crear(proyecto) {
        proyecto.fechaRegistro = new Date();
        proyecto.activo = true;

        const db = await connectDB.connect();
        const result = await db.collection('Proyecto').insertOne(proyecto);
        let idObjeto = result.insertedId;
        return idObjeto;
    }

    async listar() {
        const db = await connectDB.connect();
        let arreglo = await db.collection('Proyecto').find().toArray();
        await connectDB.disconnect();
        return arreglo;
    }

    async buscarPorId(id) {
        const db = await connectDB.connect();
        const proyecto = await db.collection('Proyecto').findOne({_id: new ObjectId(id)});
        await connectDB.disconnect();
        return proyecto;
    }

    async actualizar(id, datosActualizados) {
        const db = await connectDB.connect();
        const result = await db.collection('Proyecto').updateOne(
            {_id: new ObjectId(id)}, 
            {$set: datosActualizados}
        );
        await connectDB.disconnect();
        return result.modifiedCount;
    }

    async eliminar(id) {
        const db = await connectDB.connect();
        const result = await db.collection('Proyecto').deleteOne({_id: new ObjectId(id)});
        await connectDB.disconnect();
        return result.deletedCount;
    }
}

module.exports = proyectoModel;