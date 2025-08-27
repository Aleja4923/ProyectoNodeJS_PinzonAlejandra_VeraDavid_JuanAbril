const prompt = require('prompt-sync')();

class TransaccionView {
    pedirDatosTransaccion() {
        const proyectoId = prompt('Ingrese el ID del proyecto: ');
        const facturaId = prompt('Ingrese el ID de la factura: ');
        
        return {
            proyectoId,
            facturaId,
            fecha: new Date(),
            estado: 'pendiente'
        };
    }
    
    pedirIdTransaccion() {
        return prompt('Ingrese el ID de la transacción: ');
    }
    
    pedirDatosActualizacion() {
        console.log('Ingrese los nuevos datos (deje en blanco para no modificar):');
        const estado = prompt('Nuevo estado (pendiente/completada/cancelada): ');
        
        const datosActualizados = {};
        if(estado) datosActualizados.estado = estado;
        
        return datosActualizados;
    }
    
    mostrarMensaje(msg) {
        console.log(msg);
    }
    
    mostrarTransacciones(transacciones) {
        console.log("\n--Lista de Transacciones--\n");
        transacciones.forEach(transaccion => {
            console.log(`ID: ${transaccion._id}`);
            console.log(`Proyecto ID: ${transaccion.proyectoId}`);
            console.log(`Factura ID: ${transaccion.facturaId}`);
            console.log(`Fecha: ${transaccion.fecha}`);
            console.log(`Estado: ${transaccion.estado}`);
            console.log("---------------------");
        });
    }
    
    mostrarTransaccion(transaccion) {
        if(!transaccion) {
            console.log('Transacción no encontrada');
            return;
        }
        
        console.log("\n--Datos de la Transacción--\n");
        console.log(`ID: ${transaccion._id}`);
        console.log(`Proyecto ID: ${transaccion.proyectoId}`);
        console.log(`Factura ID: ${transaccion.facturaId}`);
        console.log(`Fecha: ${transaccion.fecha}`);
        console.log(`Estado: ${transaccion.estado}`);
    }
}

module.exports = TransaccionView;