const { Material } = require('../../db.js');


const createMaterial = async (body) => {
  if (!body) throw Error('No se recibieron materiales'); 

  const { name, VdVId } = body;

  try {
    const newMaterial = await Material.create({
      name: name,
      VdVId: VdVId,
    });

    await newMaterial.addVdV(VdVId, { through: { selfGranted: false } });

    return newMaterial;
  } catch (error) {
    throw Error('Ocurrio un error durante la creación de materiales. No fue posible procesar la peticion');
  }
};

const crearMaterialFinal = async (body) => {
  if (!body) throw Error('No se recibieron materiales'); 

  const { name } = body;
  const material = await Material.create({
    name,
  });
  return material;
};

const getAllMaterials = async () => {
  const allMaterials = await Material.findAll();
  return allMaterials;
};

const deleteMaterial = async (name) => {
  if(!name) throw Error('Debes ingresar un nombre'); 

  const material = await Material.destroy({
    where: { name: name },
  });
  return material;
};

const chargeDbMaterial = async () => {
  const bulkCreateMaterial = await Material.bulkCreate([
    { name: 'Madera' },
    { name: 'Vidrio' },
    { name: 'Papel' },
    { name: 'Plastico' },
    { name: 'Chapa' },
    { name: 'Hierro' },
  ]);

  return bulkCreateMaterial;
};

module.exports = {
  createMaterial,
  getAllMaterials,
  deleteMaterial,
  crearMaterialFinal,
  chargeDbMaterial,
};
