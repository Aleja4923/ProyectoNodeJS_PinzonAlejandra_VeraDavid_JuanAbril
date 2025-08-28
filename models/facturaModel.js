const {ObjectId} = require('mongodb');
const connectDB = require('./db');

class facturaModel {
    constructor() {
        this.schema = {
            proyectoId: 'string',
            fechaEmitida: 'object',
            fechaVencimiento: 'object',
            fechaPago: 'object',
            subtotal: 'number',
            total: 'number',
            estado: 'string'
        }
    }
    
    validar(factura) {
        const requiredFields = ['proyectoId', 'fechaEmitida', 'fechaVencimiento', 'subtotal', 'total', 'estado'];
        for(let campo of requiredFields) {
            if(typeof factura[campo] !== this.schema[campo]) {
                return false;
            }
        }
        return true;
    }
    
    async crear(factura) {
        factura.fechaEmitida = new Date();
        factura.estado = 'emitida';
        factura.fechaPago = null;
        
        if(!this.validar(factura)) {
            throw new Error('Error en el tipo de datos ingresados');
        }
        
        const db = await connectDB.connect();
        const result = await db.collection('facturas').insertOne(factura);
        let idObjeto = result.insertedId;
        await connectDB.disconnect();
        return idObjeto;
    }
    
    async listar() {
        const db = await connectDB.connect();
        let arreglo = await db.collection('facturas').find().toArray();
        await connectDB.disconnect();
        return arreglo;
    }
    
    async buscarPorId(id) {
        const db = await connectDB.connect();
        const factura = await db.collection('facturas').findOne({_id: new ObjectId(id)});
        await connectDB.disconnect();
        return factura;
    }
    
    async actualizar(id, datosActualizados) {
        const db = await connectDB.connect();
        const result = await db.collection('facturas').updateOne(
            {_id: new ObjectId(id)}, 
            {$set: datosActualizados}
        );
        await connectDB.disconnect();
        return result.modifiedCount;
    }
    
    async eliminar(id) {
        const db = await connectDB.connect();
        const result = await db.collection('facturas').deleteOne({_id: new ObjectId(id)});
        await connectDB.disconnect();
        return result.deletedCount;
    }
}

module.exports = facturaModel;