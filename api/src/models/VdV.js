const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    'VdV',
    {
      id: {
        type: DataTypes.INTEGER, // buscar regex
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      img: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      address: {
        // Ver que necesita maps para que almacenemos aca // Logitud y latitud: Cordenadas Maps
        type: DataTypes.STRING,
        allowNull: false,
      },
      CBU: {
        type: DataTypes.STRING,
        unique: true,
        // validate: {
        //   len: [22, 22], // buscar regex (22 caracteres)
        // },
      },
      mail: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        // buscar regex
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        // validate: {
        //   len: [8, 20],
        // },
      },
      status: {
        type: DataTypes.ENUM('Pending', 'Active', 'Disabled'), // Active de ser aprobado.
        defaultValue: 'Active', // 'Pending' // Admin lo rechaza se elimina el registro
      },
    },
    { timestamp: false }
  );
};
