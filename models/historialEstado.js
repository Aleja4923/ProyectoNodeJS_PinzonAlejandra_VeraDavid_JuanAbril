const {ObjectId} = require('mongodb');
const connectDB = require('../db');

class HistorialEstadoModel {
    constructor() {
        this.schema = {
            proyectoId: 'string',
            estadoAnterior: 'string',
            estadoNuevo: 'string',
            fechaCambio: 'object',
            motivo: 'string',
            usuario: 'string'
        }
    }
    
    validar(historial) {
        for(let campo in this.schema) {
            if(typeof historial[campo] !== this.schema[campo]) {
                return false;
            }
        }
        return true;
    }
    
    async crear(historial) {
        historial.fechaCambio = new Date();
        
        if(!this.validar(historial)) {
            throw new Error('Error en el tipo de datos ingresados');
        }
        
        const db = await connectDB.connect();
        const result = await db.collection('historialEstados').insertOne(historial);
        let idObjeto = result.insertedId;
        await connectDB.disconnect();
        return idObjeto;
    }
    
    async listar() {
        const db = await connectDB.connect();
        let arreglo = await db.collection('historialEstados').find().toArray();
        await connectDB.disconnect();
        return arreglo;
    }
    
    async buscarPorId(id) {
        const db = await connectDB.connect();
        const historial = await db.collection('historialEstados').findOne({_id: new ObjectId(id)});
        await connectDB.disconnect();
        return historial;
    }
    
    async actualizar(id, datosActualizados) {
        const db = await connectDB.connect();
        const result = await db.collection('historialEstados').updateOne(
            {_id: new ObjectId(id)}, 
            {$set: datosActualizados}
        );
        await connectDB.disconnect();
        return result.modifiedCount;
    }
    
    async eliminar(id) {
        const db = await connectDB.connect();
        const result = await db.collection('historialEstados').deleteOne({_id: new ObjectId(id)});
        await connectDB.disconnect();
        return result.deletedCount;
    }
}

module.exports = HistorialEstadoModel;