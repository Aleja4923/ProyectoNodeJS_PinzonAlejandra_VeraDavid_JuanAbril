const prompt = require('prompt-sync')();

class contratoView {
    pedirDatosContrato() {
        const proyectoId = prompt('Ingrese el ID del proyecto: ');
        const fechaFin = new Date(prompt('Ingrese la fecha fin del contrato (YYYY-MM-DD): '));
        const valor = parseFloat(prompt('Ingrese el valor del contrato: '));
        
        return {
            proyectoId,
            fechaInicio: new Date(),
            fechaFin,
            valor,
            estado: 'vigente'
        };
    }
    
    pedirIdContrato() {
        return prompt('Ingrese el ID del contrato: ');
    }
    
    pedirDatosActualizacion() {
        console.log('Ingrese los nuevos datos (deje en blanco para no modificar):');
        const fechaFin = prompt('Nueva fecha fin (YYYY-MM-DD): ');
        const valor = prompt('Nuevo valor: ');
        const estado = prompt('Nuevo estado (vigente/vencido/cancelado): ');
        
        const datosActualizados = {};
        if(fechaFin) datosActualizados.fechaFin = new Date(fechaFin);
        if(valor) datosActualizados.valor = parseFloat(valor);
        if(estado) datosActualizados.estado = estado;
        
        return datosActualizados;
    }
    
    mostrarMensaje(msg) {
        console.log(msg);
    }
    
    mostrarContratos(contratos) {
        console.log("\n--Lista de Contratos--\n");
        contratos.forEach(contrato => {
            console.log(`ID: ${contrato._id}`);
            console.log(`Proyecto ID: ${contrato.proyectoId}`);
            console.log(`Fecha Inicio: ${contrato.fechaInicio}`);
            console.log(`Fecha Fin: ${contrato.fechaFin}`);
            console.log(`Valor: $${contrato.valor}`);
            console.log(`Estado: ${contrato.estado}`);
            console.log("---------------------");
        });
    }
    
    mostrarContrato(contrato) {
        if(!contrato) {
            console.log('Contrato no encontrado');
            return;
        }
        
        console.log("\n--Datos del Contrato--\n");
        console.log(`ID: ${contrato._id}`);
        console.log(`Proyecto ID: ${contrato.proyectoId}`);
        console.log(`Fecha Inicio: ${contrato.fechaInicio}`);
        console.log(`Fecha Fin: ${contrato.fechaFin}`);
        console.log(`Valor: $${contrato.valor}`);
        console.log(`Estado: ${contrato.estado}`);
    }
}

module.exports = contratoView;