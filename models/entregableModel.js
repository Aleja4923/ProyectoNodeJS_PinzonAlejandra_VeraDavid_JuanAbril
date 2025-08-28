const {ObjectId} = require('mongodb');
const connectDB = require('./db');

class entregableModel {
    constructor() {
        this.schema = {
            proyectoId: 'string',
            fechaLimite: 'object',
            estado: 'string',
            fechaEntrega: 'object'
        }
    }
    
    validar(entregable) {
        const requiredFields = ['proyectoId', 'fechaLimite', 'estado'];
        for(let campo of requiredFields) {
            if(typeof entregable[campo] !== this.schema[campo]) {
                return false;
            }
        }
        return true;
    }
    
    async crear(entregable) {
        entregable.estado = 'pendiente';
        entregable.fechaEntrega = null;
        
        if(!this.validar(entregable)) {
            throw new Error('Error en el tipo de datos ingresados');
        }
        
        const db = await connectDB.connect();
        const result = await db.collection('entregables').insertOne(entregable);
        let idObjeto = result.insertedId;
        await connectDB.disconnect();
        return idObjeto;
    }
    
    async listar() {
        const db = await connectDB.connect();
        let arreglo = await db.collection('entregables').find().toArray();
        await connectDB.disconnect();
        return arreglo;
    }
    
    async buscarPorId(id) {
        const db = await connectDB.connect();
        const entregable = await db.collection('entregables').findOne({_id: new ObjectId(id)});
        await connectDB.disconnect();
        return entregable;
    }
    
    async actualizar(id, datosActualizados) {
        const db = await connectDB.connect();
        const result = await db.collection('entregables').updateOne(
            {_id: new ObjectId(id)}, 
            {$set: datosActualizados}
        );
        await connectDB.disconnect();
        return result.modifiedCount;
    }
    
    async eliminar(id) {
        const db = await connectDB.connect();
        const result = await db.collection('entregables').deleteOne({_id: new ObjectId(id)});
        await connectDB.disconnect();
        return result.deletedCount;
    }
}

module.exports = entregableModel;