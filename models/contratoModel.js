const {ObjectId} = require('mongodb');
const connectDB = require('../db');

class contratoModel {
    constructor() {
        this.schema = {
            proyectoId: 'string',
            fechaInicio: 'object',
            fechaFin: 'object',
            valor: 'number',
            estado: 'string'
        }
    }
    
    validar(contrato) {
        for(let campo in this.schema) {
            if(typeof contrato[campo] !== this.schema[campo]) {
                return false;
            }
        }
        return true;
    }
    
    async crear(contrato) {
        contrato.fechaInicio = new Date();
        contrato.estado = 'vigente';
        
        if(!this.validar(contrato)) {
            throw new Error('Error en el tipo de datos ingresados');
        }
        
        const db = await connectDB.connect();
        const result = await db.collection('contratos').insertOne(contrato);
        let idObjeto = result.insertedId;
        await connectDB.disconnect();
        return idObjeto;
    }
    
    async listar() {
        const db = await connectDB.connect();
        let arreglo = await db.collection('contratos').find().toArray();
        await connectDB.disconnect();
        return arreglo;
    }
    
    async buscarPorId(id) {
        const db = await connectDB.connect();
        const contrato = await db.collection('contratos').findOne({_id: new ObjectId(id)});
        await connectDB.disconnect();
        return contrato;
    }
    
    async actualizar(id, datosActualizados) {
        const db = await connectDB.connect();
        const result = await db.collection('contratos').updateOne(
            {_id: new ObjectId(id)}, 
            {$set: datosActualizados}
        );
        await connectDB.disconnect();
        return result.modifiedCount;
    }
    
    async eliminar(id) {
        const db = await connectDB.connect();
        const result = await db.collection('contratos').deleteOne({_id: new ObjectId(id)});
        await connectDB.disconnect();
        return result.deletedCount;
    }
}

module.exports = contratoModel;