// aca logica
const { Material } = require('../../db.js');

async function chargeDbMaterial() {
  const bulkCreateMaterial = await Material.bulkCreate([
 /*  [  Madera, Vidrio, Papel, Plastico, Chapa, Hierro] */
    { name: 'Madera' },
    { name: 'Vidrio' },
    { name: 'Papel' },
    { name: 'Plastico' },
    { name: 'Chapa' },
    { name: 'Hierro' }, 
  
  ]);

  return bulkCreateMaterial;
}

const createMaterial = async (name) => {
  const newMaterial = await Material.create({
    name: name,
  });
  return newMaterial;
};

const getAllMaterials = async () => {
  const allMaterials = await Material.findAll();
  return allMaterials;
};

const deleteMaterial = async (name) => {
  const material = await Material.destroy({
    where: { name: name },
  });
  return material;
};

module.exports = {
  chargeDbMaterial,
  createMaterial,
  getAllMaterials,
  deleteMaterial,
};
