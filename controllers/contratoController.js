const ContratoModel = require('../models/contratoModel');
const ContratoView = require('../views/contratoView');

class ContratoController {
  constructor() {
    this.modelo = new ContratoModel();
    this.vista = new ContratoView();
  }
  
    async crearContrato() {
        const datos = this.vista.pedirDatosContrato();
        try {
            const contrato = await this.modelo.crear(datos);
            this.vista.mostrarMensaje(`Contrato creado con el ID: ${contrato._id}`);
        } catch (error) {
            this.vista.mostrarMensaje(`Error: ${error.message}`);
        }
    }

    async mostrarContratos() {
        try {
            const contratos = await this.modelo.listar();
            this.vista.mostrarContratos(contratos);
        } catch (error) {
            this.vista.mostrarMensaje(`Error: ${error.message}`);
        }
    }

    async buscarContrato() {
        const id = this.vista.pedirIdContrato();
        try {
            const contrato = await this.modelo.buscarPorId(id);
            this.vista.mostrarContrato(contrato);
        } catch (error) {
            this.vista.mostrarMensaje(`Error: ${error.message}`);
        }
    }

    async actualizarContrato() {
        const id = this.vista.pedirIdContrato();
        const datosActualizados = this.vista.pedirDatosActualizacionContrato();
        try {
            const modificados = await this.modelo.actualizar(id, datosActualizados);
            if (modificados > 0) {
                this.vista.mostrarMensaje('Contrato actualizado exitosamente');
            } else {
                this.vista.mostrarMensaje('No se encontró el contrato o no se realizaron cambios');
            }
        } catch (error) {
            this.vista.mostrarMensaje(`Error: ${error.message}`);
        }
    }

    async eliminarContrato() {
        const id = this.vista.pedirIdContrato();
        try {
            const eliminados = await this.modelo.eliminar(id);
            if (eliminados > 0) {
                this.vista.mostrarMensaje('Contrato eliminado exitosamente');
            } else {
                this.vista.mostrarMensaje('No se encontró el contrato');
            }
        } catch (error) {
            this.vista.mostrarMensaje(`Error: ${error.message}`);
        }
    }
}


module.exports = ContratoController;