const prompt = require('prompt-sync')();

class propuestaView {
    pedirDatosPropuesta() {
        const clienteId = prompt('Ingrese el ID del cliente: ');
        const valor = parseFloat(prompt('Ingrese el valor de la propuesta: '));
        const fechaVencimiento = new Date(prompt('Ingrese la fecha de vencimiento (YYYY-MM-DD): '));
        
        return {
            clienteId,
            valor,
            fechaPropuesta: new Date(),
            fechaVencimiento,
            estado: 'pendiente'
        };
    }
    
    pedirIdPropuesta() {
        return prompt('Ingrese el ID de la propuesta: ');
    }
    
    pedirDatosActualizacion() {
        console.log('Ingrese los nuevos datos (deje en blanco para no modificar):');
        const valor = prompt('Nuevo valor: ');
        const fechaVencimiento = prompt('Nueva fecha de vencimiento (YYYY-MM-DD): ');
        const estado = prompt('Nuevo estado (pendiente/aceptada/rechazada): ');
        
        const datosActualizados = {};
        if(valor) datosActualizados.valor = parseFloat(valor);
        if(fechaVencimiento) datosActualizados.fechaVencimiento = new Date(fechaVencimiento);
        if(estado) datosActualizados.estado = estado;
        
        return datosActualizados;
    }
    
    mostrarMensaje(msg) {
        console.log(msg);
    }
    
    mostrarPropuestas(propuestas) {
        console.log("\n--Lista de Propuestas--\n");
        propuestas.forEach(propuesta => {
            console.log(`ID: ${propuesta._id}`);
            console.log(`Cliente ID: ${propuesta.clienteId}`);
            console.log(`Valor: ${propuesta.valor}`);
            console.log(`Fecha Propuesta: ${propuesta.fechaPropuesta}`);
            console.log(`Fecha Vencimiento: ${propuesta.fechaVencimiento}`);
            console.log(`Estado: ${propuesta.estado}`);
            console.log("---------------------");
        });
    }
    
    mostrarPropuesta(propuesta) {
        if(!propuesta) {
            console.log('Propuesta no encontrada');
            return;
        }
        
        console.log("\n--Datos de la Propuesta--\n");
        console.log(`ID: ${propuesta._id}`);
        console.log(`Cliente ID: ${propuesta.clienteId}`);
        console.log(`Valor: ${propuesta.valor}`);
        console.log(`Fecha Propuesta: ${propuesta.fechaPropuesta}`);
        console.log(`Fecha Vencimiento: ${propuesta.fechaVencimiento}`);
        console.log(`Estado: ${propuesta.estado}`);
    }
}

module.exports = propuestaView;