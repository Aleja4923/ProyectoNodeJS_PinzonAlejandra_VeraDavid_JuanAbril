class ProyectoController {
    constructor(modelo, vista) {
        this.modelo = modelo;
        this.vista = vista;
    }
    
    async crearProyecto() {
        const datos = this.vista.pedirDatosProyecto();
        try {
            const id = await this.modelo.crear(datos);
            this.vista.mostrarMensaje(`Proyecto creado con el ID: ${id}`);
        } catch(error) {
            this.vista.mostrarMensaje(`Error: ${error.message}`);
        }
    }
    
    async mostrarProyectos() {
        try {
            const proyectos = await this.modelo.listar();
            this.vista.mostrarProyectos(proyectos);
        } catch(error) {
            this.vista.mostrarMensaje(`Error: ${error.message}`);
        }
    }
    
    async buscarProyecto() {
        const id = this.vista.pedirIdProyecto();
        try {
            const proyecto = await this.modelo.buscarPorId(id);
            this.vista.mostrarProyecto(proyecto);
        } catch(error) {
            this.vista.mostrarMensaje(`Error: ${error.message}`);
        }
    }
    
    async actualizarProyecto() {
        const id = this.vista.pedirIdProyecto();
        const datosActualizados = this.vista.pedirDatosActualizacion();
        try {
            const modificados = await this.modelo.actualizar(id, datosActualizados);
            if(modificados > 0) {
                this.vista.mostrarMensaje('Proyecto actualizado exitosamente');
            } else {
                this.vista.mostrarMensaje('No se encontró el proyecto o no se realizaron cambios');
            }
        } catch(error) {
            this.vista.mostrarMensaje(`Error: ${error.message}`);
        }
    }
    
    async eliminarProyecto() {
        const id = this.vista.pedirIdProyecto();
        try {
            const eliminados = await this.modelo.eliminar(id);
            if(eliminados > 0) {
                this.vista.mostrarMensaje('Proyecto eliminado exitosamente');
            } else {
                this.vista.mostrarMensaje('No se encontró el proyecto');
            }
        } catch(error) {
            this.vista.mostrarMensaje(`Error: ${error.message}`);
        }
    }
}

module.exports = ProyectoController;