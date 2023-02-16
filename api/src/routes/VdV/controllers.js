const { VdV } = require('../../db.js');

async function chargeDbVdVs() {

  const bulkCreateVdvs = await VdV.bulkCreate([
    {  name: "Reciclar Ayuda", img: "www.imagen.com", mail:"ra@mail.com", password:"12345", address:"calle 1", description:"Somos una ONG sin fines de lucro", CBU:"34567898777"},
    {  name: "Juntos X el Cambio", img: "www.imagen.com", mail:"jxec@mail.com", password:"12345", address:"calle 2", description:"Somos una ONG sin fines de lucro", CBU:"23456788777"},
    {  name: "Te Amo Mundo", img: "www.imagen.com", mail:"tam@mail.com", password:"12345", address:"calle 3", description:"Somos una ONG sin fines de lucro", CBU:"0987698777"},
    {  name: "Salvando el Planeta", img: "www.imagen.com", mail:"sep@mail.com", password:"12345", address:"calle 4", description:"Somos una ONG sin fines de lucro", CBU:"8976557898777"},
  ]);

  return bulkCreateVdvs;
}

module.exports = {
  chargeDbVdVs,
};
