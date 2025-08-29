

const ClienteModel = require('../models/clienteModels');
const ClienteView = require('../views/clienteView');

class ClienteController {
    constructor() {
        this.modelo = new ClienteModel();
        this.vista = new ClienteView();
    }
    
    async crearCliente() {
        const datos = this.vista.pedirDatosCliente();
        try {
            const id = await this.modelo.crear(datos);
            this.vista.mostrarMensaje(`Cliente creado con el ID: ${id}`);
        } catch(error) {
            this.vista.mostrarMensaje(`Error: ${error.message}`);
        }
    }
    
    async mostrarClientes() {
        try {
            const clientes = await this.modelo.listar();
            this.vista.mostrarClientes(clientes);
        } catch(error) {
            this.vista.mostrarMensaje(`Error: ${error.message}`);
        }
    }
    
    async buscarCliente() {
        const id = this.vista.pedirIdCliente();
        try {
            const cliente = await this.modelo.buscarPorId(id);
            this.vista.mostrarCliente(cliente);
        } catch(error) {
            this.vista.mostrarMensaje(`Error: ${error.message}`);
        }
    }
    
    async actualizarCliente() {
        const id = this.vista.pedirIdCliente();
        const datosActualizados = this.vista.pedirDatosActualizacion();
        try {
            const modificados = await this.modelo.actualizar(id, datosActualizados);
            if(modificados > 0) {
                this.vista.mostrarMensaje('Cliente actualizado exitosamente');
            } else {
                this.vista.mostrarMensaje('No se encontró el cliente o no se realizaron cambios');
            }
        } catch(error) {
            this.vista.mostrarMensaje(`Error: ${error.message}`);
        }
    }
    
    async eliminarCliente() {
        const id = this.vista.pedirIdCliente();
        try {
            const eliminados = await this.modelo.eliminar(id);
            if(eliminados > 0) {
                this.vista.mostrarMensaje('Cliente eliminado exitosamente');
            } else {
                this.vista.mostrarMensaje('No se encontró el cliente');
            }
        } catch(error) {
            this.vista.mostrarMensaje(`Error: ${error.message}`);
        }
    }
}

module.exports = ClienteController;