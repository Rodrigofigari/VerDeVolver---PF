const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    'User',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      last_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      mail: {
        type: DataTypes.STRING, // buscra regex
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        // validate: {
        //   len: [8, 20],
        // },
      },
      address: {
        type: DataTypes.STRING, // buscra regex
        allowNull: false,
      },
      role: {
        type: DataTypes.ENUM('User', 'Owner', 'Admin'),
        defaultValue: 'User',
      },
    },
    { timestamp: false }
  );
};
