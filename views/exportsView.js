const prompt = require('prompt-sync')();

class exportsView {

    pedirIdCliente() {
        return prompt('Ingrese el ID del cliente: ');
    }
    
    mostrarMensaje(msg) {
        console.log(msg);
    }


    loadData(){
        if(!fs.existsSync(path)){
            fs.writeFileSync(path,"[]");
        };// Creo el archivo con data si no existe.
        const data = fs.readFileSync(path);//Cargo y Guardo la data en una variable
        return JSON.parse(data);//Retorno la data en formato JSON
    }

}

module.exports = exportsView;
