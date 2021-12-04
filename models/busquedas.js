const axios = require('axios').default;

class Busquedas {
  historial = ['Bogotá', 'Melgar', ''];

  constructor() {
    // TODO: leer DB si existe
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
}

module.exports = Busquedas;
