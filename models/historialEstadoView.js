const prompt = require('prompt-sync')();

class historialEstadoView {
    pedirDatosHistorial() {
        const proyectoId = prompt('Ingrese el ID del proyecto: ');
        const estadoAnterior = prompt('Ingrese el estado anterior: ');
        const estadoNuevo = prompt('Ingrese el estado nuevo: ');
        const motivo = prompt('Ingrese el motivo del cambio: ');
        const usuario = prompt('Ingrese el usuario que realizó el cambio: ');
        
        return {
            proyectoId,
            estadoAnterior,
            estadoNuevo,
            fechaCambio: new Date(),
            motivo,
            usuario
        };
    }
    
    pedirIdHistorial() {
        return prompt('Ingrese el ID del historial: ');
    }
    
    pedirDatosActualizacion() {
        console.log('Ingrese los nuevos datos (deje en blanco para no modificar):');
        const motivo = prompt('Nuevo motivo: ');
        const usuario = prompt('Nuevo usuario: ');
        
        const datosActualizados = {};
        if(motivo) datosActualizados.motivo = motivo;
        if(usuario) datosActualizados.usuario = usuario;
        
        return datosActualizados;
    }
    
    mostrarMensaje(msg) {
        console.log(msg);
    }
    
    mostrarHistoriales(historiales) {
        console.log("\n--Lista de Historial de Estados--\n");
        historiales.forEach(historial => {
            console.log(`ID: ${historial._id}`);
            console.log(`Proyecto ID: ${historial.proyectoId}`);
            console.log(`Estado Anterior: ${historial.estadoAnterior}`);
            console.log(`Estado Nuevo: ${historial.estadoNuevo}`);
            console.log(`Fecha Cambio: ${historial.fechaCambio}`);
            console.log(`Motivo: ${historial.motivo}`);
            console.log(`Usuario: ${historial.usuario}`);
            console.log("---------------------");
        });
    }
    
    mostrarHistorial(historial) {
        if(!historial) {
            console.log('Historial no encontrado');
            return;
        }
        
        console.log("\n--Datos del Historial--\n");
        console.log(`ID: ${historial._id}`);
        console.log(`Proyecto ID: ${historial.proyectoId}`);
        console.log(`Estado Anterior: ${historial.estadoAnterior}`);
        console.log(`Estado Nuevo: ${historial.estadoNuevo}`);
        console.log(`Fecha Cambio: ${historial.fechaCambio}`);
        console.log(`Motivo: ${historial.motivo}`);
        console.log(`Usuario: ${historial.usuario}`);
    }
}

module.exports = historialEstadoView;