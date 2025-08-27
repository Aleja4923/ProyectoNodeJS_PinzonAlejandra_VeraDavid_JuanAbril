const EntregableModel = require('./Models/entregableModel');
const EntregableView = require('./Views/entregableView');

class EntregableController {
    constructor() {
        this.modelo = new EntregableModel();
        this.vista = new EntregableView();
    }
    
    async crearEntregable() {
        const datos = this.vista.pedirDatosEntregable();
        try {
            const id = await this.modelo.crear(datos);
            this.vista.mostrarMensaje(`Entregable creado con el ID: ${id}`);
        } catch(error) {
            this.vista.mostrarMensaje(`Error: ${error.message}`);
        }
    }
    
    async mostrarEntregables() {
        try {
            const entregables = await this.modelo.listar();
            this.vista.mostrarEntregables(entregables);
        } catch(error) {
            this.vista.mostrarMensaje(`Error: ${error.message}`);
        }
    }
    
    async buscarEntregable() {
        const id = this.vista.pedirIdEntregable();
        try {
            const entregable = await this.modelo.buscarPorId(id);
            this.vista.mostrarEntregable(entregable);
        } catch(error) {
            this.vista.mostrarMensaje(`Error: ${error.message}`);
        }
    }
    
    async actualizarEntregable() {
        const id = this.vista.pedirIdEntregable();
        const datosActualizados = this.vista.pedirDatosActualizacion();
        try {
            const modificados = await this.modelo.actualizar(id, datosActualizados);
            if(modificados > 0) {
                this.vista.mostrarMensaje('Entregable actualizado exitosamente');
            } else {
                this.vista.mostrarMensaje('No se encontró el entregable o no se realizaron cambios');
            }
        } catch(error) {
            this.vista.mostrarMensaje(`Error: ${error.message}`);
        }
    }
    
    async eliminarEntregable() {
        const id = this.vista.pedirIdEntregable();
        try {
            const eliminados = await this.modelo.eliminar(id);
            if(eliminados > 0) {
                this.vista.mostrarMensaje('Entregable eliminado exitosamente');
            } else {
                this.vista.mostrarMensaje('No se encontró el entregable');
            }
        } catch(error) {
            this.vista.mostrarMensaje(`Error: ${error.message}`);
        }
    }
}

module.exports = EntregableController;