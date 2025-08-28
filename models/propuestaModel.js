const {ObjectId} = require('mongodb');
const connectDB = require('./db');

class propuestaModel {
    constructor() {
        this.schema = {
            clienteId: 'string',
            valor: 'number',
            fechaPropuesta: 'object',
            fechaVencimiento: 'object',
            estado: 'string'
        }
    }
    
    validar(propuesta) {
        for(let campo in this.schema) {
            if(typeof propuesta[campo] !== this.schema[campo]) {
                return false;
            }
        }
        return true;
    }
    
    async crear(propuesta) {
        propuesta.fechaPropuesta = new Date();
        propuesta.estado = 'pendiente';
        
        if(!this.validar(propuesta)) {
            throw new Error('Error en el tipo de datos ingresados');
        }
        
        const db = await connectDB.connect();
        const result = await db.collection('propuestas').insertOne(propuesta);
        let idObjeto = result.insertedId;
        await connectDB.disconnect();
        return idObjeto;
    }
    
    async listar() {
        const db = await connectDB.connect();
        let arreglo = await db.collection('propuestas').find().toArray();
        await connectDB.disconnect();
        return arreglo;
    }
    
    async buscarPorId(id) {
        const db = await connectDB.connect();
        const propuesta = await db.collection('propuestas').findOne({_id: new ObjectId(id)});
        await connectDB.disconnect();
        return propuesta;
    }
    
    async actualizar(id, datosActualizados) {
        const db = await connectDB.connect();
        const result = await db.collection('propuestas').updateOne(
            {_id: new ObjectId(id)}, 
            {$set: datosActualizados}
        );
        await connectDB.disconnect();
        return result.modifiedCount;
    }
    
    async eliminar(id) {
        const db = await connectDB.connect();
        const result = await db.collection('propuestas').deleteOne({_id: new ObjectId(id)});
        await connectDB.disconnect();
        return result.deletedCount;
    }
}

module.exports = propuestaModel;