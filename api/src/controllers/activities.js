const { Country, Activity } = require("../db");

const postActivity = async (req, res) => {
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
