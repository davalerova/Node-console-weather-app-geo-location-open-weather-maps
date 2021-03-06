const fs = require('fs');
const axios = require('axios').default;

class Busquedas {
  historial = [];
  dbPath = './db/database.json';

  constructor() {
    // TODO: leer DB si existe
    this.leerDB();
  }

  get historialCapitalizado() {
    // Capitalizar cada palabra

    return this.historial.map((lugar) => {
      let palabras = lugar.split(' ');
      palabras = palabras.map((p) => p[0].toUpperCase() + p.substring(1));
      return palabras.join(' ');
    });
  }

  get mapboxParams() {
    return {
      limit: 5,
      language: 'es',
      access_token: process.env.MAPBOX_KEY,
    };
  }

  get openweathermapParams() {
    return {
      appid: process.env.OPENWEATHERMAP_KEY,
      units: 'metric',
      lang: 'es',
    };
  }

  async ciudad(lugar = '') {
    try {
      // Perición http
      const instance = axios.create({
        baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json?`,
        params: this.mapboxParams,
      });

      const resp = await instance.get();

      return resp.data.features.map((lugar) => ({
        id: lugar.id,
        nombre: lugar.place_name,
        lng: lugar.center[0],
        lat: lugar.center[1],
      }));
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  async climaLugar(lat, lon) {
    try {
      // Instance axios.create()
      const instance = axios.create({
        baseURL: `https://api.openweathermap.org/data/2.5/weather`,
        params: { ...this.openweathermapParams, lat, lon },
      });
      // resp.data
      const resp = await instance.get();
      // console.log(resp.data);
      const { weather, main } = resp.data;
      return {
        desc: weather[0].description,
        min: main.temp_min,
        max: main.temp_max,
        temp: main.temp,
      };
    } catch (error) {
      console.log(error);
    }
  }

  agregarHistorial(lugar = '') {
    // TODO: prevenir duplicados
    if (this.historial.includes(lugar.toLocaleLowerCase())) {
      return;
    }

    this.historial = this.historial.splice(0, 5);

    this.historial.unshift(lugar.toLocaleLowerCase());
    // Grabar en DB
    this.guardarDB();
  }

  guardarDB() {
    const payload = {
      historial: this.historial,
    };
    fs.writeFileSync(this.dbPath, JSON.stringify(payload));
  }

  leerDB() {
    // Debe existir
    if (!fs.existsSync(this.dbPath)) {
      return null;
    }
    // Cargar la info
    const info = fs.readFileSync(this.dbPath, { encoding: 'utf-8' });
    const data = JSON.parse(info);
    this.historial = data['historial'];
  }
}

module.exports = Busquedas;
