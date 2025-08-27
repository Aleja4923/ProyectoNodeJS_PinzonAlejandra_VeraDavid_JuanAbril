const {ObjectId} = require('mongodb');
const connectDB = require('../db');

class ProyectoModel {
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
        // Validar campos requeridos, permitir fechaFinReal como null inicialmente
        const requiredFields = ['clienteId', 'propuestaId', 'fechaInicio', 'fechaFinEstimada', 'estado', 'progresoPorcentaje'];
        for(let campo of requiredFields) {
            if(typeof proyecto[campo] !== this.schema[campo]) {
                return false;
            }
        }
        return true;
    }
    
    async crear(proyecto) {
        proyecto.fechaInicio = new Date();
        proyecto.estado = 'activo';
        proyecto.progresoPorcentaje = 0;
        proyecto.fechaFinReal = null;
        
        if(!this.validar(proyecto)) {
            throw new Error('Error en el tipo de datos ingresados');
        }
        
        const db = await connectDB.connect();
        const result = await db.collection('proyectos').insertOne(proyecto);
        let idObjeto = result.insertedId;
        await connectDB.disconnect();
        return idObjeto;
    }
    
    async listar() {
        const db = await connectDB.connect();
        let arreglo = await db.collection('proyectos').find().toArray();
        await connectDB.disconnect();
        return arreglo;
    }
    
    async buscarPorId(id) {
        const db = await connectDB.connect();
        const proyecto = await db.collection('proyectos').findOne({_id: new ObjectId(id)});
        await connectDB.disconnect();
        return proyecto;
    }
    
    async actualizar(id, datosActualizados) {
        const db = await connectDB.connect();
        const result = await db.collection('proyectos').updateOne(
            {_id: new ObjectId(id)}, 
            {$set: datosActualizados}
        );
        await connectDB.disconnect();
        return result.modifiedCount;
    }
    
    async eliminar(id) {
        const db = await connectDB.connect();
        const result = await db.collection('proyectos').deleteOne({_id: new ObjectId(id)});
        await connectDB.disconnect();
        return result.deletedCount;
    }
}

module.exports = ProyectoModel;