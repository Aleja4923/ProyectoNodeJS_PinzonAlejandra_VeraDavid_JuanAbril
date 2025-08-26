// /views/clienteView.js
const prompt = require('prompt-sync')();

class ClienteView {
  askName() {
    return prompt('Nombre: ').trim();
  }

  askCompany() {
    return prompt('Empresa: ').trim();
  }

  askContact() {
    return prompt('Contacto: ').trim();
  }

  askMail() {
    return prompt('Correo: ').trim();
  }

  askPhone() {
    return prompt('Teléfono: ').trim();
  }

  askPassword(msg = 'Contraseña: ') {
    return prompt.hide(msg).trim();
  }

  askPasswordConfirm() {
    return prompt.hide('Confirma tu contraseña: ').trim();
  }

  askId(action = 'gestionar') {
    return Number(prompt(`ID del cliente a ${action}: `).trim());
  }

  showMessage(msg) {
    console.log(msg);
  }

  showList(clientes) {
    console.log('\n=== Lista de Clientes ===');
    if (!clientes.length) {
      console.log('No hay clientes registrados.');
      return;
    }
    clientes.forEach(c => {
      console.log(`[${c.clienteId}] ${c.nombre} - ${c.empresa} (${c.correo}) - ${c.telefono} - Estado: ${c.estado}`);
    });
    console.log('==========================\n');
  }
}

module.exports = ClienteView;
