

const exportsModel = require('../models/exportsModel');
const exportsView = require('../views/clienteView');

class exportsController {
    constructor() {
        this.modelo = new exportsModel();
        this.vista = new exportsView();
    }

    async ClienteProyecto() {
        const id = this.vista.pedirIdCliente();
        try {
            const clienteProyecto = await this.modelo.buscarClienteProyecto(id);
            this.vista.loadData(clienteProyecto);
        } catch(error) {
            this.vista.mostrarMensaje(`Error: ${error.message}`);
        }
    }

    async buscarContratosEntregables() {
        const id = this.vista.pedirIdCliente();
        try {
            const contratoEntregable = await this.modelo.buscarContratosEntregables(id);
            this.vista.loadData(contratoEntregable);
        } catch(error) {
            this.vista.mostrarMensaje(`Error: ${error.message}`);
        }
    }
    
}

module.exports = exportsController;