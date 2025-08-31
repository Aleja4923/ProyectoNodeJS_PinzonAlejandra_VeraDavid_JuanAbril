// Importar vista principal
const MainView = require('./views/mainView');

// Importar controladores
const ClienteController = require('./controllers/clienteController');
const PropuestaController = require('./controllers/propuestaController');
const ProyectoController = require('./controllers/proyectoController');
const ContratoController = require('./controllers/contratoController');
const EntregableController = require('./controllers/entregableController');

// Instanciar componentes
const mainView = new MainView();


const clienteController = new ClienteController();
const propuestaController = new PropuestaController();
const proyectoController = new ProyectoController();
const contratoController = new ContratoController();
const entregableController = new EntregableController();

async function main() {
    let continuar = true;

    while (continuar) {
        const opcion = mainView.mostrarMenuPrincipal();
    
        switch (opcion) {
            case 1:
                await gestionarClientes();
                break;
            case 2:
                await gestionarPropuestas();
                break;
            case 3:
                await gestionarProyectos();
                break;
            case 4:
                await gestionarContratos();
                break;
            case 5:
                await gestionarEntregables();
                break;
            case 6:
                continuar=false
                mainView.mostrarMensaje("Saliendo del sistema...");
                break;
            default:
                mainView.mostrarMensaje("Opción inválida.");
        }
    }
}

main();

async function gestionarClientes() {
    let continuar = true;
    while(continuar) {
        const opcion = mainView.mostrarMenuCRUD('Cliente');
        
        switch(opcion) {
            case 1:
                await clienteController.crearCliente();
                break;
            case 2:
                await clienteController.mostrarClientes();
                break;
            case 3:
                await clienteController.buscarCliente();
                break;
            case 4:
                await clienteController.actualizarCliente();
                break;
            case 5:
                await clienteController.eliminarCliente();
                break;
            case 6:
                continuar = false;
                break;
            default:
                mainView.mostrarMensaje('Opción no válida');
                break;
        }
        
        }
    }

async function gestionarPropuestas() {
    let continuar = true;
    while(continuar) {
        const opcion = mainView.mostrarMenuCRUD('Propuesta');
        
        switch(opcion) {
            case 1:
                await propuestaController.crearPropuesta();
                break;
            case 2:
                await propuestaController.mostrarPropuestas();
                break;
            case 3:
                await propuestaController.buscarPropuesta();
                break;
            case 4:
                await propuestaController.actualizarPropuesta();
                break;
            case 5:
                await propuestaController.eliminarPropuesta();
                break;
            case 6:
                continuar = false;
                break;
            default:
                mainView.mostrarMensaje('Opción no válida');
                break;
        }
        
        if(continuar) {
            mainView.pausar();
        }
    }
}

async function gestionarProyectos() {
    let continuar = true;
    while(continuar) {
        const opcion = mainView.mostrarMenuCRUD('Proyecto');
        
        switch(opcion) {
            case 1:
                await proyectoController.crearProyecto();
                break;
            case 2:
                await proyectoController.mostrarProyectos();
                break;
            case 3:
                await proyectoController.buscarProyecto();
                break;
            case 4:
                await proyectoController.actualizarProyecto();
                break;
            case 5:
                await proyectoController.eliminarProyecto();
                break;
            case 6:
                continuar = false;
                break;
            default:
                mainView.mostrarMensaje('Opción no válida');
                break;
        }
        
        if(continuar) {
            mainView.pausar();
        }
    }
}


async function gestionarContratos() {
    let continuar = true;
    while(continuar) {
        const opcion = mainView.mostrarMenuCRUD('Contrato');
        
        switch(opcion) {
            case 1:
                await contratoController.crearContrato();
                break;
            case 2:
                await contratoController.mostrarContratos();
                break;
            case 3:
                await contratoController.buscarContrato();
                break;
            case 4:
                await contratoController.actualizarContrato();
                break;
            case 5:
                await contratoController.eliminarContrato();
                break;
            case 6:
                continuar = false;
                break;
            default:
                mainView.mostrarMensaje('Opción no válida');
                break;
        }
        
        if(continuar) {
            mainView.pausar();
        }
    }
}

async function gestionarEntregables() {
    let continuar = true;
    while(continuar) {
        const opcion = mainView.mostrarMenuCRUD('Entregable');
        
        switch(opcion) {
            case 1:
                await entregableController.crearEntregable();
                break;
            case 2:
                await entregableController.mostrarEntregables();
                break;
            case 3:
                await entregableController.buscarEntregable();
                break;
            case 4:
                await entregableController.actualizarEntregable();
                break;
            case 5:
                await entregableController.eliminarEntregable();
                break;
            case 6:
                continuar = false;
                break;
            default:
                mainView.mostrarMensaje('Opción no válida');
                break;
        }
        
        if(continuar) {
            mainView.pausar();
        }
    }
}
  
// Iniciar la aplicación
main().catch(error => {
    console.error('Error fatal en la aplicación:', error);
    process.exit(1);
});