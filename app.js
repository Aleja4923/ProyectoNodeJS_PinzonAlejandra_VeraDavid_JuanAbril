// Importar vistas
const MainView = require('./Views/mainView');
const ClienteView = require('./Views/clienteView');
const PropuestaView = require('/Views/propuestaView');
const ProyectoView = require('/Views/proyectoView');

// Importar modelos
const ClienteModel = require('/Models/clienteModel');
const PropuestaModel = require('/Models/propuestaModel');
const ProyectoModel = require('/Models/proyectoModel');
const ContratoModel = require('/Models/contratoModel');
const EntregableModel = require('/Models/entregableModel');
const TransaccionModel = require('/Models/transaccionModel');
const FacturaModel = require('./Models/facturaModel');
const HistorialEstadoModel = require('./Models/historialEstadoModel');


const ClienteController = require('/Controllers/clienteController');
const PropuestaController = require('/Controllers/propuestaController');
const ProyectoController = require('/Controllers/proyectoController');


const mainView = new MainView();
const clienteModel = new ClienteModel();
const clienteView = new ClienteView();
const clienteController = new ClienteController(clienteModel, clienteView);


const propuestaModel = new PropuestaModel();
const propuestaView = new PropuestaView();
const propuestaController = new PropuestaController(propuestaModel, propuestaView);


const proyectoModel = new ProyectoModel();
const proyectoView = new ProyectoView();
const proyectoController = new ProyectoController(proyectoModel, proyectoView);

async function gestionarClientes() {
    let continuar = true;
    while(continuar) {
        const opcion = mainView.mostrarMenuCRUD('clientes');
        
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
        
        if(continuar) {
            mainView.pausar();
        }
    }
}

async function gestionarPropuestas() {
    let continuar = true;
    while(continuar) {
        const opcion = mainView.mostrarMenuCRUD('propuestas');
        
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
        const opcion = mainView.mostrarMenuCRUD('proyectos');
        
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

async function main() {
    let continuar = true;
    
    while(continuar) {
        try {
            const opcion = mainView.mostrarMenuPrincipal();
            
            switch(opcion) {
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
                    mainView.mostrarMensaje('Gestión de Contratos - Por implementar');
                    mainView.pausar();
                    break;
                case 5:
                    mainView.mostrarMensaje('Gestión de Entregables - Por implementar');
                    mainView.pausar();
                    break;
                case 6:
                    mainView.mostrarMensaje('Gestión de Transacciones - Por implementar');
                    mainView.pausar();
                    break;
                case 7:
                    mainView.mostrarMensaje('Gestión de Facturas - Por implementar');
                    mainView.pausar();
                    break;
                case 8:
                    mainView.mostrarMensaje('Historial de Estados - Por implementar');
                    mainView.pausar();
                    break;
                case 9:
                    mainView.mostrarMensaje('¡Gracias por usar el Gestor de Portafolio Freelance!');
                    continuar = false;
                    break;
                default:
                    mainView.mostrarMensaje('Opción no válida');
                    mainView.pausar();
                    break;
            }
        } catch(error) {
            mainView.mostrarMensaje(`Error en la aplicación: ${error.message}`);
            mainView.pausar();
        }
    }
}

// Iniciar la aplicación
main().catch(error => {
    console.error('Error fatal en la aplicación:', error);
    process.exit(1);
});