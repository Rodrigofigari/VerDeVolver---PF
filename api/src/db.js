const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');

require('dotenv').config();
const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;

const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/verdevolver`,
  {
    logging: false, // establecer en console.log para ver las consultas SQL sin procesar
    native: false, // permite que Sequelize sepa que podemos usar pg-native para ~30% más de velocidad
  }
);

const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, '/models'))
  .filter(
    (file) =>
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach((model) => model(sequelize));

// Ponemos mayusculas a los modelos
// devuelve array con pares de clave: valor de los modelos
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);

// Convierte el arreglo en un objeto con clave valor -> Nombre del metodo : fn()
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un (destructuring)

console.log('models:', sequelize.models);

const { Donation, Feedback, Material, Role, Service, User, VdV } =
  sequelize.models;



User.belongsToMany(VdV, { through: Donation }); // valroes : id (autoincremental) y monto --> Id usuario y el id de la entidad
VdV.belongsToMany(User, { through: Donation });

User.belongsToMany(VdV, { through: Feedback }); // Valores :
VdV.belongsToMany(User, { through: Feedback });

User.belongsToMany(VdV, { through: Service }); // id la contratacion del seervicio // IdEnt . IdUser
VdV.belongsToMany(User, { through: Service });

// Usuario a roll -> no se crea una tabal intermedia
User.belongsTo(Role); // 1 User pertenece a un roll
Role.hasMany(User); // 1 roll puede tener muchos usuarios

// Vdv con materiales -> Tabala intermedia
Material.belongsToMany(VdV, { through: 'Material_VdV' });
VdV.belongsToMany(Material, { through: 'Material_VdV' });

// hasmany / hasone



//

// hasMany : tiene muchos
// belongs to : pertenece a

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize, // para importart la conexión { conn } = require('./db.js');
};
