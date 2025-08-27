const FacturaModel = require('../models/facturaModel');
const FacturaView = require('../views/facturaView');

class FacturaController {
    constructor() {
        this.modelo = new FacturaModel();
        this.vista = new FacturaView();
    }
    
    async crearFactura() {
        const datos = this.vista.pedirDatosFactura();
        try {
            const id = await this.modelo.crear(datos);
            this.vista.mostrarMensaje(`Factura creada con el ID: ${id}`);
        } catch(error) {
            this.vista.mostrarMensaje(`Error: ${error.message}`);
        }
    }
    
    async mostrarFacturas() {
        try {
            const facturas = await this.modelo.listar();
            this.vista.mostrarFacturas(facturas);
        } catch(error) {
            this.vista.mostrarMensaje(`Error: ${error.message}`);
        }
    }
    
    async buscarFactura() {
        const id = this.vista.pedirIdFactura();
        try {
            const factura = await this.modelo.buscarPorId(id);
            this.vista.mostrarFactura(factura);
        } catch(error) {
            this.vista.mostrarMensaje(`Error: ${error.message}`);
        }
    }
    
    async actualizarFactura() {
        const id = this.vista.pedirIdFactura();
        const datosActualizados = this.vista.pedirDatosActualizacion();
        try {
            const modificados = await this.modelo.actualizar(id, datosActualizados);
            if(modificados > 0) {
                this.vista.mostrarMensaje('Factura actualizada exitosamente');
            } else {
                this.vista.mostrarMensaje('No se encontró la factura o no se realizaron cambios');
            }
        } catch(error) {
            this.vista.mostrarMensaje(`Error: ${error.message}`);
        }
    }
    
    async eliminarFactura() {
        const id = this.vista.pedirIdFactura();
        try {
            const eliminados = await this.modelo.eliminar(id);
            if(eliminados > 0) {
                this.vista.mostrarMensaje('Factura eliminada exitosamente');
            } else {
                this.vista.mostrarMensaje('No se encontró la factura');
            }
        } catch(error) {
            this.vista.mostrarMensaje(`Error: ${error.message}`);
        }
    }
}

module.exports = FacturaController;