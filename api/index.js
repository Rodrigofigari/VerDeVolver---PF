const server = require('./src/app.js');
const { conn } = require('./src/db.js');
// Para Deploy
// require('dotenv').config();
// const { PGPORT } = process.env;

conn.sync({ force: false }).then(() => {
  server.listen(3001, () => {
    // ${PGPORT} en lugar de 3001
    console.log(`%s listening at 3001`); // eslint-disable-line no-console
  });
});
