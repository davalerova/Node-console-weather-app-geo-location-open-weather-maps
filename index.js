const {
  leerInput,
  inquirerMenu,
  pausa,
  listarLugares,
} = require('./helpers/inquirer');
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
        const termino = await leerInput('Ciudad: ');
        const lugares = await busquedas.ciudad(termino);
        const id = await listarLugares(lugares);
        const lugarSel = lugares.find((l) => l.id === id);
        const clima = await busquedas.climaLugar(lugarSel.lat, lugarSel.lng);
        // console.log(clima);
        // console.log(lugarSel);
        // console.log({ id });
        // console.log(lugares);

        // Buscar los lugares
        // Seleccionar el lugar
        // Clima
        // Resultados
        console.clear();
        console.log('\nInformación de la ciudad:\n'.green);
        console.log('Cuidad: ', lugarSel.nombre.green);
        console.log('Lat: ', lugarSel.lat);
        console.log('Lng: ', lugarSel.lng);
        console.log('Temperatura: ', clima.temp, '°C'.green);
        console.log('Mínima: ', clima.min, '°C'.green);
        console.log('Máxima: ', clima.max, '°C'.green);
        console.log('Como está el clima: ', clima.desc.green);
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
