class PropuestaController {
    constructor(modelo, vista) {
        this.modelo = modelo;
        this.vista = vista;
    }
    
    async crearPropuesta() {
        const datos = this.vista.pedirDatosPropuesta();
        try {
            const id = await this.modelo.crear(datos);
            this.vista.mostrarMensaje(`Propuesta creada con el ID: ${id}`);
        } catch(error) {
            this.vista.mostrarMensaje(`Error: ${error.message}`);
        }
    }
    
    async mostrarPropuestas() {
        try {
            const propuestas = await this.modelo.listar();
            this.vista.mostrarPropuestas(propuestas);
        } catch(error) {
            this.vista.mostrarMensaje(`Error: ${error.message}`);
        }
    }
    
    async buscarPropuesta() {
        const id = this.vista.pedirIdPropuesta();
        try {
            const propuesta = await this.modelo.buscarPorId(id);
            this.vista.mostrarPropuesta(propuesta);
        } catch(error) {
            this.vista.mostrarMensaje(`Error: ${error.message}`);
        }
    }
    
    async actualizarPropuesta() {
        const id = this.vista.pedirIdPropuesta();
        const datosActualizados = this.vista.pedirDatosActualizacion();
        try {
            const modificados = await this.modelo.actualizar(id, datosActualizados);
            if(modificados > 0) {
                this.vista.mostrarMensaje('Propuesta actualizada exitosamente');
            } else {
                this.vista.mostrarMensaje('No se encontró la propuesta o no se realizaron cambios');
            }
        } catch(error) {
            this.vista.mostrarMensaje(`Error: ${error.message}`);
        }
    }
    
    async eliminarPropuesta() {
        const id = this.vista.pedirIdPropuesta();
        try {
            const eliminados = await this.modelo.eliminar(id);
            if(eliminados > 0) {
                this.vista.mostrarMensaje('Propuesta eliminada exitosamente');
            } else {
                this.vista.mostrarMensaje('No se encontró la propuesta');
            }
        } catch(error) {
            this.vista.mostrarMensaje(`Error: ${error.message}`);
        }
    }
}

module.exports = PropuestaController;