const { VdV, Material } = require('../../db.js');
const { Op } = require('sequelize');

const chargeDbVdVs = (array) => {
  const result = array.map(async (element) => {
    return await vdvCreate(element);
  });
  return Promise.all(result);
};

const vdvCreate = async (body) => {
  const { name, img, description, mail, address, cbu, materials, lat, lng } =
    body;

  if (!name || !img || !description || !mail || !address)
    throw Error('Debes completar todos los campos obligatorios');
  const vdvCreate = await VdV.create({
    name,
    img,
    mail,
    address,
    description,
    cbu,
    lat,
    lng,
  });

  await vdvCreate.addMaterials(materials);
  console.log(vdvCreate);
  return vdvCreate;
};

const getVdV = async (name) => {
  if (name) {
    const allVdVquey = await VdV.findAll({
      where: {
        name: {
          [Op.iLike]: `%${name}%`,
        },
      },
      include: {
        model: Material,
        attributes: ['name'],
        through: {
          attributes: [],
        },
      },
    });
    return allVdVquey;
  } else {
    const allVdV = await VdV.findAll({
      include: {
        model: Material,
        attributes: ['name'],
        through: {
          attributes: [],
        },
      },
    });

    return allVdV;
  }
};

const getPending = async () => {
  const allVdV = await VdV.findAll({
    where: { status: 'Pending' },
    include: {
      model: Material,
      attributes: ['name'],
      through: {
        attributes: [],
      },
    },
  });

  return allVdV;
};

const getActive = async () => {
  const allVdV = await VdV.findAll({
    where: { status: 'Active' },
    include: {
      model: Material,
      attributes: ['name'],
      through: {
        attributes: [],
      },
    },
  });

  return allVdV;
};

const getByIdVdV = async (id) => {
  const VdVFind = await VdV.findByPk(id, {
    include: {
      model: Material,
      attributes: ['name'],
      through: {
        attributes: [],
      },
    },
  });
  return VdVFind;
};

const upDateVdV = async (id, body) => {
  if (body.materials) {
    await VdV.update(body, {
      where: { id },
    });
    const result = await getByIdVdV(id);
    await result.setMaterials(body.materials);
    const resultFinal = await getByIdVdV(id);
    return resultFinal;
  } else {
    await VdV.update(body, {
      where: { id },
    });
    const result = await getByIdVdV(id);
    return result;
  }
};

const deleteVdV = (id) => {
  const VdVdelete = VdV.destroy({
    where: {
      id,
    },
  });
  return VdVdelete;
};

const functionRandom = () => {
  return (random = Math.random() * 9);
};

const changeStatus = async (id) => {
  const randomPassword = functionRandom();

  await VdV.update(
    { status: 'Active', password: `VerdeVolver${randomPassword}` },
    { where: { id } }
  );

  const result = await getByIdVdV(id);
  return result;
};

const deletePerfil = async (id) => {
  await VdV.update({ status: 'Disabled' }, { where: { id } });

  const result = await getByIdVdV(id);
  return result;
};

module.exports = {
  chargeDbVdVs,
  vdvCreate,
  getVdV,
  getByIdVdV,
  upDateVdV,
  deleteVdV,
  changeStatus,
  getPending,
  getActive,
  deletePerfil,
};
