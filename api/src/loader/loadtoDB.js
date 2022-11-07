const axios = require("axios");
const { BASE_URL } = process.env;
const { Country } = require("../db");

const getCountriesToDb = async () => {
  const getCountries = await axios.get(BASE_URL);
  const allCountries = getCountries.data;
  try {
    const modelCountries = await allCountries.map((el) => {
      return {
        name: el.translations.spa ? el.translations.spa.common : el.name.common,
        official_name: el.translations.spa
          ? el.translations.spa.official
          : el.name.official,
        id: el.cca3,
        flag: el.flags ? el.flags[0] : "undefined",
        continent: el.region,
        capital: el.capital ? el.capital[0] : "undefined",
        subregion: el.subregion ? el.subregion : "undefined",
        area: el.area,
        population: el.population,
      };
    });
    modelCountries.forEach(async (el) => {
      await Country.findOrCreate({
        where: {
          id: el.id,
          name: el.name,
          official_name: el.official_name,
          flag: el.flag,
          continent: el.continent,
          capital: el.capital,
          subregion: el.subregion,
          area: el.area,
          population: el.population,
        },
      });
    });
    console.log("Paises cargados correctamente");
  } catch (error) {
    console.log("Error en la carga de paises: ", error);
  }
};

module.exports = { getCountriesToDb };
