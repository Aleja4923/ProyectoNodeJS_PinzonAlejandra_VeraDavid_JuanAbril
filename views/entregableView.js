const prompt = require('prompt-sync')();

class EntregableView {
    pedirDatosEntregable() {
        const proyectoId = prompt('Ingrese el ID del proyecto: ');
        const fechaLimite = new Date(prompt('Ingrese la fecha límite (YYYY-MM-DD): '));
        
        return {
            proyectoId,
            fechaLimite,
            estado: 'pendiente',
            fechaEntrega: null
        };
    }
    
    pedirIdEntregable() {
        return prompt('Ingrese el ID del entregable: ');
    }
    
    pedirDatosActualizacion() {
        console.log('Ingrese los nuevos datos (deje en blanco para no modificar):');
        const fechaLimite = prompt('Nueva fecha límite (YYYY-MM-DD): ');
        const estado = prompt('Nuevo estado (pendiente/entregado/aprobado/rechazado): ');
        const fechaEntrega = prompt('Fecha de entrega (YYYY-MM-DD): ');
        
        const datosActualizados = {};
        if(fechaLimite) datosActualizados.fechaLimite = new Date(fechaLimite);
        if(estado) datosActualizados.estado = estado;
        if(fechaEntrega) datosActualizados.fechaEntrega = new Date(fechaEntrega);
        
        return datosActualizados;
    }
    
    mostrarMensaje(msg) {
        console.log(msg);
    }
    
    mostrarEntregables(entregables) {
        console.log("\n--Lista de Entregables--\n");
        entregables.forEach(entregable => {
            console.log(`ID: ${entregable._id}`);
            console.log(`Proyecto ID: ${entregable.proyectoId}`);
            console.log(`Fecha Límite: ${entregable.fechaLimite}`);
            console.log(`Estado: ${entregable.estado}`);
            console.log(`Fecha Entrega: ${entregable.fechaEntrega || 'No entregado'}`);
            console.log("---------------------");
        });
    }
    
    mostrarEntregable(entregable) {
        if(!entregable) {
            console.log('Entregable no encontrado');
            return;
        }
        
        console.log("\n--Datos del Entregable--\n");
        console.log(`ID: ${entregable._id}`);
        console.log(`Proyecto ID: ${entregable.proyectoId}`);
        console.log(`Fecha Límite: ${entregable.fechaLimite}`);
        console.log(`Estado: ${entregable.estado}`);
        console.log(`Fecha Entrega: ${entregable.fechaEntrega || 'No entregado'}`);
    }
}

module.exports = EntregableView;