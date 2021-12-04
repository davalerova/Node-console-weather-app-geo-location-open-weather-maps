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
}

module.exports = Busquedas;
