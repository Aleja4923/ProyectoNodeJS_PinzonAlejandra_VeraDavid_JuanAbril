const prompt = require('prompt-sync')();

class mainView {
    mostrarMenuPrincipal() {
        console.log("\n==== GESTOR DE PORTAFOLIO FREELANCE ====");
        console.log("1. Gestión de Clientes");
        console.log("2. Gestión de Propuestas");
        console.log("3. Gestión de Proyectos");
        console.log("4. Gestión de Contratos");
        console.log("5. Gestión de Entregables");
        console.log("6. Salir");
        return parseInt(prompt("Seleccione una opción: "));
    }
    
    mostrarMenuCRUD(entidad) {
        console.log(`\n==== GESTIÓN DE ${entidad.toUpperCase()} ====`);
        console.log("1. Crear");
        console.log("2. Listar todos");
        console.log("3. Buscar por ID");
        console.log("4. Actualizar");
        console.log("5. Eliminar");
        console.log("6. Volver al menú principal");
        return parseInt(prompt("Seleccione una opción: "));
    }
    
    mostrarMensaje(mensaje) {
        console.log(mensaje);
    }
    
    pausar() {
        prompt("Presione Enter para continuar...");
    }
}

module.exports = mainView;