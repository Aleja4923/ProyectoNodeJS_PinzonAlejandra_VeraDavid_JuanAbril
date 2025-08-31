const {ObjectId} = require('mongodb');
const connectDB = require('../db');

class clienteModel {
    
    async crear(cliente) {
        cliente.fechaRegistro = new Date();
        cliente.activo = true;
        
        const db = await connectDB.connect();
        const result = await db.collection('Cliente').insertOne(cliente);
        let idObjeto = result.insertedId;
        return idObjeto;}
    }
    
    async listar() {
        const db = await connectDB.connect();
        let arreglo = await db.collection('Cliente').find().toArray();
        return arreglo;
    }
    
    async buscarPorId(id) {
        const db = await connectDB.connect();
        const cliente = await db.collection('Cliente').findOne({_id: new ObjectId(id)});
        return cliente;
    }
    
    async actualizar(id, datosActualizados) {
        const db = await connectDB.connect();
        const result = await db.collection('Cliente').updateOne(
            {_id: new ObjectId(id)}, 
            {$set: datosActualizados}
        );
        return result.modifiedCount;
    }
    
    async eliminar(id) {
        const db = await connectDB.connect();
        const result = await db.collection('Cliente').deleteOne({_id: new ObjectId(id)});
        return result.deletedCount;
    }
}

module.exports = clienteModel;