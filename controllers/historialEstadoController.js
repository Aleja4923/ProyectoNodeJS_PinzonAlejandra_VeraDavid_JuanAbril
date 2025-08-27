const HistorialEstadoModel = require('../models/historialEstadoModel');
const HistorialEstadoView = require('../views/historialEstadoView');

class HistorialEstadoController {
    constructor() {
        this.modelo = new HistorialEstadoModel();
        this.vista = new HistorialEstadoView();
    }
    
    async crearHistorial() {
        const datos = this.vista.pedirDatosHistorial();
        try {
            const id = await this.modelo.crear(datos);
            this.vista.mostrarMensaje(`Historial creado con el ID: ${id}`);
        } catch(error) {
            this.vista.mostrarMensaje(`Error: ${error.message}`);
        }
    }
    
    async mostrarHistoriales() {
        try {
            const historiales = await this.modelo.listar();
            this.vista.mostrarHistoriales(historiales);
        } catch(error) {
            this.vista.mostrarMensaje(`Error: ${error.message}`);
        }
    }
    
    async buscarHistorial() {
        const id = this.vista.pedirIdHistorial();
        try {
            const historial = await this.modelo.buscarPorId(id);
            this.vista.mostrarHistorial(historial);
        } catch(error) {
            this.vista.mostrarMensaje(`Error: ${error.message}`);
        }
    }
    
    async actualizarHistorial() {
        const id = this.vista.pedirIdHistorial();
        const datosActualizados = this.vista.pedirDatosActualizacion();
        try {
            const modificados = await this.modelo.actualizar(id, datosActualizados);
            if(modificados > 0) {
                this.vista.mostrarMensaje('Historial actualizado exitosamente');
            } else {
                this.vista.mostrarMensaje('No se encontró el historial o no se realizaron cambios');
            }
        } catch(error) {
            this.vista.mostrarMensaje(`Error: ${error.message}`);
        }
    }
    
    async eliminarHistorial() {
        const id = this.vista.pedirIdHistorial();
        try {
            const eliminados = await this.modelo.eliminar(id);
            if(eliminados > 0) {
                this.vista.mostrarMensaje('Historial eliminado exitosamente');
            } else {
                this.vista.mostrarMensaje('No se encontró el historial');
            }
        } catch(error) {
            this.vista.mostrarMensaje(`Error: ${error.message}`);
        }
    }
}

module.exports = HistorialEstadoController;