// /controllers/clienteController.js
const prompt = require('prompt-sync')();

class ClienteController {
  constructor(modelo, vista) {
    this.modelo = modelo;
    this.vista = vista;
    this.currentCliente = null; // sesión en memoria
  }

  async login() {
    console.clear();
    console.log('===== Login Cliente =====\n');
    const correo = this.vista.askMail();
    const password = this.vista.askPassword();

    try {
      const cliente = await this.modelo.autenticar(correo, password);
      this.currentCliente = cliente;
      this.vista.showMessage(`Bienvenido, ${cliente.nombre}`);
      prompt('\nENTER para continuar...');
      return true;
    } catch (err) {
      this.vista.showMessage(`[ERROR] ${err.message}`);
      prompt('\nENTER para continuar...');
      return false;
    }
  }

  async createItem() {
    const nombre = this.vista.askName();
    const empresa = this.vista.askCompany();
    const correo = this.vista.askMail();
    const telefono = this.vista.askPhone();

    const pw1 = this.vista.askPassword('Crea una contraseña: ');
    const pw2 = this.vista.askPasswordConfirm();
    if (pw1 !== pw2) throw new Error('Las contraseñas no coinciden');

    const cliente = {
      nombre,
      empresa,
      correo,
      telefono,
      estado: 'activo',
      password: pw1
    };

    const id = await this.modelo.crear(cliente);
    this.vista.showMessage(`Cliente agregado con ID: ${id}`);
  }

  async listItems() {
    const data = await this.modelo.listar();
    this.vista.showList(data);
  }

  async updateItem() {
    const data = await this.modelo.listar();
    this.vista.showList(data);

    const id = this.vista.askId('actualizar');
    const nuevoNombre = this.vista.askName();
    const nuevaEmpresa = this.vista.askCompany();
    const nuevoCorreo = this.vista.askMail();
    const nuevoTelefono = this.vista.askPhone();

    await this.modelo.actualizar(id, {
      nombre: nuevoNombre,
      empresa: nuevaEmpresa,
      correo: nuevoCorreo,
      telefono: nuevoTelefono
    });
    this.vista.showMessage('Cliente actualizado.');
  }

  async deleteItem() {
    const data = await this.modelo.listar();
    this.vista.showList(data);

    const id = this.vista.askId('eliminar');
    await this.modelo.eliminar(id);
    this.vista.showMessage('Cliente eliminado.');
  }

  async menuCliente() {
    const ok = await this.login();
    if (!ok) return;

    let continuar = true;
    while (continuar) {
      console.clear();
      console.log('===== Gestión de Clientes =====');
      console.log('1. Crear cliente');
      console.log('2. Listar clientes');
      console.log('3. Actualizar cliente');
      console.log('4. Eliminar cliente');
      console.log('5. Cerrar sesión');
      console.log('6. Volver\n');

      const option = prompt('Opción: ').trim();

      try {
        switch (option) {
          case '1': await this.createItem(); break;
          case '2': await this.listItems(); break;
          case '3': await this.updateItem(); break;
          case '4': await this.deleteItem(); break;
          case '5':
            this.currentCliente = null;
            this.vista.showMessage('Sesión cerrada.');
            prompt('\nENTER para continuar...');
            if (!(await this.login())) return;
            break;
          case '6':
            continuar = false;
            break;
          default:
            this.vista.showMessage('Opción inválida.');
        }
      } catch (e) {
        this.vista.showMessage(`[ERROR] ${e.message}`);
      }

      if (continuar) prompt('\nPresiona ENTER para continuar...');
    }
  }
}

module.exports = ClienteController;
