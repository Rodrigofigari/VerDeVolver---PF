const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Donation', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true, // allownull: false , unique: true
      autoIncrement: true,
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('Delivered', 'Pending'),
      defaultValue: 'Pending',
    },

    // como obtener el id del usuario registrado -> LocalStorage -> redux
    // como pbtener el id de la entidad -> podriamos obtenerlo por paramans (path /detalle/:id)
  });
};
