const { VdV, Material, Role, User } = require('../../db.js');
const { Op } = require('sequelize');

const chargeDbVdVs = (array) => {
  const result = array.map(async (element) => {
    return await vdvCreate(element);
  });
  return Promise.all(result);
};

const vdvCreate = async (body) => {
  const { name, img, description, mail, address, cbu, materials, lat, lng } = body;

  const check = await checkMail(mail);
  if (check == false) throw Error('El mail ingresado ya pertenece a una cuenta'); 

  const role = await Role.findByPk(4);

  if (!name || !img || !description || !mail || !address || !lat || !lng || !materials)
    throw Error('Debes completar todos los campos obligatorios');
    
  const vdvCreate = await VdV.create({
    name: body.name,
    img: body.img,
    mail: body.mail,
    address: body.address,
    description: body.description,
    cbu: body.cbu,
    lat: body.lat,
    lng: body.lng,
    RoleId: role.id,
  });

  await vdvCreate.addMaterials(materials);
  console.log(vdvCreate);
  return vdvCreate;
};

const checkMail = async (mail) => {
  if (!mail) throw Error ('Debes ingresar un mail'); 
  
  const userMail = await User.findOne({
    where: { mail },
  });

  const vdvMail = await VdV.findOne({
    where: { mail },
  }); 

  if ( vdvMail || userMail) {
    return false ; 
  }

  return true ; 
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
      }
    });

    if (!allVdVquey) throw Error(`No fue posible encontrar una entidad con nombre ${name}`);

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
    if (!allVdV) throw Error('No fue posible encontrar ninguna entidad en la base de datos');

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

  if (!allVdV) throw Error('No fue posible encontrar ninguna entidad con status pending'); 

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

  if (!allVdV) throw Error('No fue posible encontrar ninguna entidad con status active en la base de datos'); 

  return allVdV;
};

const getByIdVdV = async (id) => {
  if(!id) throw Error('Debes ingresar un id'); 

  const VdVFind = await VdV.findByPk(id, {
    include: {
      model: Material,
      attributes: ['name'],
      through: {
        attributes: [],
      },
    },
  });

  if (!VdVFind) throw Error(`No fue posible encontrar una entidad con id ${id}`);

  return VdVFind;
};

const upDateVdV = async (id, body) => {
  if (!id) throw Error('Debes ingresar un id'); 
  if (!body) throw Error('No se recibieron datos para modificar');

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
  if (!id) throw Error('Debes ingresar un id'); 

  const VdVdelete = VdV.destroy({
    where: {
      id,
    },
  });
  return VdVdelete;
};

const functionRandom = () => {
  return (random = Math.random() * 55.2);
};

const changeStatus = async (id) => {
  if (!id) throw Error('Debes ingresar un id'); 

  const randomPassword = functionRandom();

  await VdV.update(
    { status: 'Active', password: `!dfg${randomPassword}` },
    { where: { id } }
  );

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
};
