const prompt = require('prompt-sync')();

class ProyectoView {
    pedirDatosProyecto() {
        const clienteId = prompt('Ingrese el ID del cliente: ');
        const propuestaId = prompt('Ingrese el ID de la propuesta: ');
        const fechaFinEstimada = new Date(prompt('Ingrese la fecha fin estimada (YYYY-MM-DD): '));
        
        return {
            clienteId,
            propuestaId,
            fechaInicio: new Date(),
            fechaFinEstimada,
            fechaFinReal: null,
            estado: 'activo',
            progresoPorcentaje: 0
        };
    }
    
    pedirIdProyecto() {
        return prompt('Ingrese el ID del proyecto: ');
    }
    
    pedirDatosActualizacion() {
        console.log('Ingrese los nuevos datos (deje en blanco para no modificar):');
        const fechaFinEstimada = prompt('Nueva fecha fin estimada (YYYY-MM-DD): ');
        const fechaFinReal = prompt('Fecha fin real (YYYY-MM-DD): ');
        const estado = prompt('Nuevo estado (activo/pausado/finalizado/cancelado): ');
        const progresoPorcentaje = prompt('Nuevo progreso (0-100): ');
        
        const datosActualizados = {};
        if(fechaFinEstimada) datosActualizados.fechaFinEstimada = new Date(fechaFinEstimada);
        if(fechaFinReal) datosActualizados.fechaFinReal = new Date(fechaFinReal);
        if(estado) datosActualizados.estado = estado;
        if(progresoPorcentaje) datosActualizados.progresoPorcentaje = parseInt(progresoPorcentaje);
        
        return datosActualizados;
    }
    
    mostrarMensaje(msg) {
        console.log(msg);
    }
    
    mostrarProyectos(proyectos) {
        console.log("\n--Lista de Proyectos--\n");
        proyectos.forEach(proyecto => {
            console.log(`ID: ${proyecto._id}`);
            console.log(`Cliente ID: ${proyecto.clienteId}`);
            console.log(`Propuesta ID: ${proyecto.propuestaId}`);
            console.log(`Fecha Inicio: ${proyecto.fechaInicio}`);
            console.log(`Fecha Fin Estimada: ${proyecto.fechaFinEstimada}`);
            console.log(`Fecha Fin Real: ${proyecto.fechaFinReal || 'No finalizado'}`);
            console.log(`Estado: ${proyecto.estado}`);
            console.log(`Progreso: ${proyecto.progresoPorcentaje}%`);
            console.log("---------------------");
        });
    }
    
    mostrarProyecto(proyecto) {
        if(!proyecto) {
            console.log('Proyecto no encontrado');
            return;
        }
        
        console.log("\n--Datos del Proyecto--\n");
        console.log(`ID: ${proyecto._id}`);
        console.log(`Cliente ID: ${proyecto.clienteId}`);
        console.log(`Propuesta ID: ${proyecto.propuestaId}`);
        console.log(`Fecha Inicio: ${proyecto.fechaInicio}`);
        console.log(`Fecha Fin Estimada: ${proyecto.fechaFinEstimada}`);
        console.log(`Fecha Fin Real: ${proyecto.fechaFinReal || 'No finalizado'}`);
        console.log(`Estado: ${proyecto.estado}`);
        console.log(`Progreso: ${proyecto.progresoPorcentaje}%`);
    }
}

module.exports = ProyectoView;