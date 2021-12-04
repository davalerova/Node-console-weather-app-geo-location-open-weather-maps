const { leerInput, inquirerMenu, pausa } = require('./helpers/inquirer');
const Busquedas = require('./models/busquedas');
require('colors');
require('dotenv').config();

const main = async () => {
  const busquedas = new Busquedas();
  let opt;
  do {
    opt = await inquirerMenu();
    switch (opt) {
      case 1:
        // Mostrar mensaje
        const lugar = await leerInput('Ciudad: ');
        await busquedas.ciudad(lugar);

        // Buscar los lugares
        // Seleccionar el lugar
        // Clima
        // Resultados
        console.log('\nInformación de la ciudad\n'.green);
        console.log('Cuidad: ');
        console.log('Lat: ');
        console.log('Lng: ');
        console.log('Temperatura: ');
        console.log('Mínima: ');
        console.log('Máxima: ');
        break;
      case 2:
        break;
      case 3:
        break;

      default:
        break;
    }
    opt !== 0 && (await pausa());
  } while (opt !== 0);
};

main();
