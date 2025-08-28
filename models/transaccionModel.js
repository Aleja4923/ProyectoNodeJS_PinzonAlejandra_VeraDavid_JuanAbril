const {ObjectId} = require('mongodb');
const connectDB = require('./db');

class transaccionModel {
    constructor() {
        this.schema = {
            proyectoId: 'string',
            facturaId: 'string',
            fecha: 'object',
            estado: 'string'
        }
    }
    
    validar(transaccion) {
        for(let campo in this.schema) {
            if(typeof transaccion[campo] !== this.schema[campo]) {
                return false;
            }
        }
        return true;
    }
    
    async crear(transaccion) {
        transaccion.fecha = new Date();
        transaccion.estado = 'pendiente';
        
        if(!this.validar(transaccion)) {
            throw new Error('Error en el tipo de datos ingresados');
        }
        
        const db = await connectDB.connect();
        const result = await db.collection('transacciones').insertOne(transaccion);
        let idObjeto = result.insertedId;
        await connectDB.disconnect();
        return idObjeto;
    }
    
    async listar() {
        const db = await connectDB.connect();
        let arreglo = await db.collection('transacciones').find().toArray();
        await connectDB.disconnect();
        return arreglo;
    }
    
    async buscarPorId(id) {
        const db = await connectDB.connect();
        const transaccion = await db.collection('transacciones').findOne({_id: new ObjectId(id)});
        await connectDB.disconnect();
        return transaccion;
    }
    
    async actualizar(id, datosActualizados) {
        const db = await connectDB.connect();
        const result = await db.collection('transacciones').updateOne(
            {_id: new ObjectId(id)}, 
            {$set: datosActualizados}
        );
        await connectDB.disconnect();
        return result.modifiedCount;
    }
    
    async eliminar(id) {
        const db = await connectDB.connect();
        const result = await db.collection('transacciones').deleteOne({_id: new ObjectId(id)});
        await connectDB.disconnect();
        return result.deletedCount;
    }
}

module.exports = transaccionModel;