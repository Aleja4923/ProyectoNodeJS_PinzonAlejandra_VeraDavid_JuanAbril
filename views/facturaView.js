const prompt = require('prompt-sync')();

class facturaView {
    pedirDatosFactura() {
        const proyectoId = prompt('Ingrese el ID del proyecto: ');
        const fechaVencimiento = new Date(prompt('Ingrese la fecha de vencimiento (YYYY-MM-DD): '));
        const subtotal = parseFloat(prompt('Ingrese el subtotal: '));
        const total = parseFloat(prompt('Ingrese el total: '));
        
        return {
            proyectoId,
            fechaEmitida: new Date(),
            fechaVencimiento,
            fechaPago: null,
            subtotal,
            total,
            estado: 'emitida'
        };
    }
    
    pedirIdFactura() {
        return prompt('Ingrese el ID de la factura: ');
    }
    
    pedirDatosActualizacion() {
        console.log('Ingrese los nuevos datos (deje en blanco para no modificar):');
        const fechaVencimiento = prompt('Nueva fecha de vencimiento (YYYY-MM-DD): ');
        const fechaPago = prompt('Fecha de pago (YYYY-MM-DD): ');
        const subtotal = prompt('Nuevo subtotal: ');
        const total = prompt('Nuevo total: ');
        const estado = prompt('Nuevo estado (emitida/pagada/vencida/cancelada): ');
        
        const datosActualizados = {};
        if(fechaVencimiento) datosActualizados.fechaVencimiento = new Date(fechaVencimiento);
        if(fechaPago) datosActualizados.fechaPago = new Date(fechaPago);
        if(subtotal) datosActualizados.subtotal = parseFloat(subtotal);
        if(total) datosActualizados.total = parseFloat(total);
        if(estado) datosActualizados.estado = estado;
        
        return datosActualizados;
    }
    
    mostrarMensaje(msg) {
        console.log(msg);
    }
    
    mostrarFacturas(facturas) {
        console.log("\n--Lista de Facturas--\n");
        facturas.forEach(factura => {
            console.log(`ID: ${factura._id}`);
            console.log(`Proyecto ID: ${factura.proyectoId}`);
            console.log(`Fecha Emitida: ${factura.fechaEmitida}`);
            console.log(`Fecha Vencimiento: ${factura.fechaVencimiento}`);
            console.log(`Fecha Pago: ${factura.fechaPago || 'No pagada'}`);
            console.log(`Subtotal: $${factura.subtotal}`);
            console.log(`Total: $${factura.total}`);
            console.log(`Estado: ${factura.estado}`);
            console.log("---------------------");
        });
    }
}

module.exports = facturaView;