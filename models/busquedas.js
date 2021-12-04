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

      console.log(resp.data);
      return resp;
    } catch (error) {
      return [];
    }
  }
}

module.exports = Busquedas;
