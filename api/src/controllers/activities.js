const { Country, Activity } = require("../db");

const postActivity = async (req, res) => {
  // const { name, difficulty, duration, season, countryID } = req.body;

  // const createActivity = await Activity.create({
  //   name: name,
  //   difficulty: difficulty,
  //   duration: duration,
  //   season: season,
  // });

  // const checkCountry = await Country.findAll({
  //   where: {
  //     id: countryID,
  //   },
  // });

  // const addActivity = await createActivity.addCountries(checkCountry);

  // return res.send(addActivity);
  const { name, dificulty, duration, season, countryID } = req.body;

  try {
    const newActivity = await Activity.create({
      name: name,
      dificulty: dificulty,
      duration: duration,
      season: season,
    });

    for (let i = 0; i < countryID.length; i++) {
      await newActivity.addCountries(
        await Country.findAll({
          where: {
            id: countryID[i],
          },
        })
      );
    }
    return res.status(200).send("Actividad creada correctamente");
  } catch (error) {
    return res.status(404).send(error);
  }
};

const getActivities = async (req, res) => {
  try {
    const allActivities = await Activity.findAll({ include: Country });
    res.send(allActivities);
  } catch (error) {
    return res.status(400).send(error);
  }
};

module.exports = { postActivity, getActivities };

// try {
//   const pj = await Character.create({ ...req.body });
//   if (pj) return res.status(201).json(pj);
// } catch (error) {
//   return res.status(404).send("Error en alguno de los datos provistos");
// }
