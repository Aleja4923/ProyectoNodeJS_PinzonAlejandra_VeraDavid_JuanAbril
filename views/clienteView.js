const prompt = require('prompt-sync')();

class clienteView {
    pedirDatosCliente() {
        const nombre = prompt('Ingrese el nombre del cliente: ');
        const empresa = prompt('Ingrese la empresa: ');
        const email = prompt('Ingrese el email: ');
        const telefono = prompt('Ingrese el teléfono: ');
        const direccion = prompt('Ingrese la dirección: ');
        
        return {
            nombre,
            empresa,
            email,
            telefono,
            direccion,
            fechaRegistro: new Date(),
            activo: true
        };
    }
    
    pedirIdCliente() {
        return prompt('Ingrese el ID del cliente: ');
    }
    
    pedirDatosActualizacion() {
        console.log('Ingrese los nuevos datos (deje en blanco para no modificar):');
        const nombre = prompt('Nuevo nombre: ') || undefined;
        const empresa = prompt('Nueva empresa: ') || undefined;
        const email = prompt('Nuevo email: ') || undefined;
        const telefono = prompt('Nuevo teléfono: ') || undefined;
        const direccion = prompt('Nueva dirección: ') || undefined;
        
        const datosActualizados = {};
        if(nombre) datosActualizados.nombre = nombre;
        if(empresa) datosActualizados.empresa = empresa;
        if(email) datosActualizados.email = email;
        if(telefono) datosActualizados.telefono = telefono;
        if(direccion) datosActualizados.direccion = direccion;
        
        return datosActualizados;
    }
    
    mostrarMensaje(msg) {
        console.log(msg);
    }
    
    mostrarClientes(clientes) {
        console.log("\n--Lista de Clientes--\n");
        clientes.forEach(cliente => {
            console.log(`ID: ${cliente._id}`);
            console.log(`Nombre: ${cliente.nombre}`);
            console.log(`Empresa: ${cliente.empresa}`);
            console.log(`Email: ${cliente.email}`);
            console.log(`Teléfono: ${cliente.telefono}`);
            console.log(`Dirección: ${cliente.direccion}`);
            console.log(`Fecha Registro: ${cliente.fechaRegistro}`);
            console.log(`Activo: ${cliente.activo}`);
            console.log("---------------------");
        });
    }
    
    mostrarCliente(cliente) {
        if(!cliente) {
            console.log('Cliente no encontrado');
            return;
        }
        
        console.log("\n--Datos del Cliente--\n");
        console.log(`ID: ${cliente._id}`);
        console.log(`Nombre: ${cliente.nombre}`);
        console.log(`Empresa: ${cliente.empresa}`);
        console.log(`Email: ${cliente.email}`);
        console.log(`Teléfono: ${cliente.telefono}`);
        console.log(`Dirección: ${cliente.direccion}`);
        console.log(`Fecha Registro: ${cliente.fechaRegistro}`);
        console.log(`Activo: ${cliente.activo}`);
    }
}

module.exports = clienteView;
