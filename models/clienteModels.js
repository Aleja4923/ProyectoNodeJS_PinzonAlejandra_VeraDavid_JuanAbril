const {ObjectId} = require('mongodb');
const connectDB = require('./db');

class clienteModel {
    constructor() {
        this.schema = {
            nombre: 'string',
            empresa: 'string',
            email: 'string',
            telefono: 'string',
            direccion: 'string',
            fechaRegistro: 'object',
            activo: 'boolean'
        }
    }
    
    validar(cliente) {
        for(let campo in this.schema) {
            if(typeof cliente[campo] !== this.schema[campo]) {
                return false;
            }
        }
        return true;
    }
    
    async crear(cliente) {
        cliente.fechaRegistro = new Date();
        cliente.activo = true;
        
        if(!this.validar(cliente)) {
            throw new Error('Error en el tipo de datos ingresados');
        }
        
        const db = await connectDB.connect();
        const result = await db.collection('clientes').insertOne(cliente);
        let idObjeto = result.insertedId;
        await connectDB.disconnect();
        return idObjeto;
    }
    
    async listar() {
        const db = await connectDB.connect();
        let arreglo = await db.collection('clientes').find().toArray();
        await connectDB.disconnect();
        return arreglo;
    }
    
    async buscarPorId(id) {
        const db = await connectDB.connect();
        const cliente = await db.collection('clientes').findOne({_id: new ObjectId(id)});
        await connectDB.disconnect();
        return cliente;
    }
    
    async actualizar(id, datosActualizados) {
        const db = await connectDB.connect();
        const result = await db.collection('clientes').updateOne(
            {_id: new ObjectId(id)}, 
            {$set: datosActualizados}
        );
        await connectDB.disconnect();
        return result.modifiedCount;
    }
    
    async eliminar(id) {
        const db = await connectDB.connect();
        const result = await db.collection('clientes').deleteOne({_id: new ObjectId(id)});
        await connectDB.disconnect();
        return result.deletedCount;
    }
}

module.exports = clienteModel;