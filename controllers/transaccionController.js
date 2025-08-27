const TransaccionModel = require('../models/transaccionModel');
const TransaccionView = require('../views/transaccionView');

class TransaccionController {
    constructor() {
        this.modelo = new TransaccionModel();
        this.vista = new TransaccionView();
    }
    
    async crearTransaccion() {
        const datos = this.vista.pedirDatosTransaccion();
        try {
            const id = await this.modelo.crear(datos);
            this.vista.mostrarMensaje(`Transacción creada con el ID: ${id}`);
        } catch(error) {
            this.vista.mostrarMensaje(`Error: ${error.message}`);
        }
    }
    
    async mostrarTransacciones() {
        try {
            const transacciones = await this.modelo.listar();
            this.vista.mostrarTransacciones(transacciones);
        } catch(error) {
            this.vista.mostrarMensaje(`Error: ${error.message}`);
        }
    }
    
    async buscarTransaccion() {
        const id = this.vista.pedirIdTransaccion();
        try {
            const transaccion = await this.modelo.buscarPorId(id);
            this.vista.mostrarTransaccion(transaccion);
        } catch(error) {
            this.vista.mostrarMensaje(`Error: ${error.message}`);
        }
    }
    
    async actualizarTransaccion() {
        const id = this.vista.pedirIdTransaccion();
        const datosActualizados = this.vista.pedirDatosActualizacion();
        try {
            const modificados = await this.modelo.actualizar(id, datosActualizados);
            if(modificados > 0) {
                this.vista.mostrarMensaje('Transacción actualizada exitosamente');
            } else {
                this.vista.mostrarMensaje('No se encontró la transacción o no se realizaron cambios');
            }
        } catch(error) {
            this.vista.mostrarMensaje(`Error: ${error.message}`);
        }
    }
    
    async eliminarTransaccion() {
        const id = this.vista.pedirIdTransaccion();
        try {
            const eliminados = await this.modelo.eliminar(id);
            if(eliminados > 0) {
                this.vista.mostrarMensaje('Transacción eliminada exitosamente');
            } else {
                this.vista.mostrarMensaje('No se encontró la transacción');
            }
        } catch(error) {
            this.vista.mostrarMensaje(`Error: ${error.message}`);
        }
    }
}

module.exports = TransaccionController;