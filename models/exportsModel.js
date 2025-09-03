
const {ObjectId} = require('mongodb');
const connectDB = require('../db');

class exportsModel 

{
    async buscarClienteProyecto(id) {
        const db = await connectDB.connect();
        const cliente = await db.collection('Cliente').findOne({_id: new ObjectId(id)});
        const proyecto = await db.collection('Proyecto').findOne({_id: new ObjectId(id)});
        return cliente,proyecto;
    }

    async buscarContratosEntregables(id) {
        const db = await connectDB.connect();
        const id = Proyecto._id;
        const contrato = await db.collection('Contrato').findOne({_id: new ObjectId(id)});
        const entregable = await db.collection('Entregable').findOne({_id: new ObjectId(id)});
        return contrato, entregable;
    }

}

module.exports = exportsModel;