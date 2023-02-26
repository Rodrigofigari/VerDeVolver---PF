const { Op } = require('sequelize');
const { Role, User } = require('../../db.js');

//ESTE ES EL BULKCREATE NO LO BORREN
async function chargeDbUsers() {
  const role = await Role.findByPk(1);

  const bulkCreateUsers = await User.bulkCreate([
    {
      name: 'Nathan',
      last_name: 'Sebhastian',
      mail: 'seb@mail.com',
      password: '12345',
      address: 'calle 10',
      RoleId: role.id,
    },
    {
      name: 'Jack',
      last_name: 'Stark',
      mail: 'jack@mail.com',
      password: '12345',
      address: 'calle 20',
      RoleId: role.id,
    },
    {
      name: 'John',
      last_name: 'Snow',
      mail: 'john@mail.com',
      password: '12345',
      address: 'calle 30',
      RoleId: role.id,
    },
    {
      name: 'Marco',
      last_name: 'Polo',
      mail: 'marco@mail.com',
      password: '12345',
      address: 'calle 40',
      RoleId: role.id,
    },
  ]);

  return bulkCreateUsers;
}

const postUser = async (body) => {
  console.log(body);
  const role = await Role.findByPk(1);
  const existUser = await User.findOne({
    // mail unique:true en modelo, no hace falta validar
    where: {
      mail: {
        [Op.like]: body.mail,
      },
    },
  });

  if (!existUser) {
    const newUser = await User.create({
      name: body.name,
      last_name: body.last_name,
      mail: body.mail,
      password: body.password,
      address: body.address,
      RoleId: role.id,
    });
    return newUser;
  }
};

const getAllUser = async () => {
  const dbAll = await User.findAll({
    include: [
      {
        model: Role,
        attributes: ['name'],
      },
    ],
  });
  return dbAll;
};

const getByName = async (name) => {
  const byName = await User.findAll({
    where: {
      name: {
        [Op.iLike]: name,
      },
    },
    include: [
      {
        model: Role,
        attributes: ['name'],
      },
    ],
  });

  return byName;
};

const findId = async (id) => {
  const byPk = await User.findByPk(id, {
    include: [
      {
        model: Role,
        attributes: ['name'],
      },
    ],
  });

  return byPk;
};

const updateUser = async (userToUD, id) => {
  await User.update(userToUD, {
    where: { id },
  });
};

const deleteUser = async (id) => {
  try {
    if (!id) throw Error('No se ha suministrado ningun id');

    const findById = await User.findAll({
      where: { id },
    });

    if (!findById) throw Error(`El id ${id} no fue encontrado`);

    await User.destroy({
      where: { id },
    });
  } catch (error) {
    throw Error({ error: error.message });
  }
};

module.exports = {
  chargeDbUsers,
  postUser,
  getAllUser,
  getByName,
  findId,
  updateUser,
  deleteUser,
};
