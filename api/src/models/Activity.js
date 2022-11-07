const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "activity",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      dificulty: {
        type: DataTypes.ENUM("1", "2", "3", "4", "5", "0"),
        defaultValue: "0",
      },
      duration: {
        type: DataTypes.STRING,
        defaultValue: "unknown",
      },
      season: {
        type: DataTypes.ENUM(
          "Verano",
          "Otoño",
          "Invierno",
          "Primavera",
          "Todas"
        ),
        defaultValue: "Todas",
      },
    },
    {
      timestamps: false,
    }
  );
};
