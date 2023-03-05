const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');

require('dotenv').config();
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;

const sequelize = new Sequelize(
  // `postgres://${PGUSER}:${PGPASSWORD}@${PGHOST}:${PGPORT}/${DATABASE}`,
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`,
  {
    logging: false,
    native: false,
  }
);

const basename = path.basename(__filename);

const modelDefiners = [];

fs.readdirSync(path.join(__dirname, '/models'))
  .filter(
    (file) =>
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

modelDefiners.forEach((model) => model(sequelize));

let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);

sequelize.models = Object.fromEntries(capsEntries);

const { Donation, Feedback, Material, Role, Service, User, VdV, Contact } =
  sequelize.models;

User.hasMany(Feedback);
Feedback.belongsTo(User);

VdV.hasMany(Feedback);
Feedback.belongsTo(VdV);

User.hasMany(Donation);
Donation.belongsTo(User);

VdV.hasMany(Donation);
Donation.belongsTo(VdV);

User.belongsTo(Role);
Role.hasMany(User);

VdV.belongsTo(Role);
Role.hasMany(VdV);

Material.belongsToMany(VdV, { through: 'Material_VdV' });
VdV.belongsToMany(Material, { through: 'Material_VdV' });

module.exports = {
  ...sequelize.models,
  conn: sequelize,
};
