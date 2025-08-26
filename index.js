// index.js
const ClienteModel = require('./src/models/clienteModel');
const ClienteView = require('./src/views/clienteView');
const ClienteController = require('./src/controllers/clienteController');

(async () => {
  const modelo = new ClienteModel();
  const vista = new ClienteView();
  const controller = new ClienteController(modelo, vista);

  await controller.menuCliente();
})();
