const { leerInput } = require('./helpers/inquirer');

const main = async () => {
  const texto = await leerInput('¿Nombre? ');
  console.log(`Hola ${texto}`);
};

main();
