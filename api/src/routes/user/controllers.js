const { Op } = require('sequelize');
const { Role, User } = require('../../db.js');
const { verify } = require('jsonwebtoken');

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
      image: body.image,
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

const modifyUserRole = async (id) => {
  try {
    await User.update({ RoleId: 3 }, { where: { id } });

    const userModified = await findId(id);
    return userModified;
  } catch (error) {
    throw Error({ error: error.message });
  }
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

const findBymail = async (mail) => {
  const userMail = User.findOne({
    where: { mail },
  });
  return userMail;
};

const changePasswordByToken = async (token, password) => {
  const { email } = verify(token, process.env.SECRET);

  const userUpdate = await findBymail(email);
  userUpdate.password = password;
  await userUpdate.save();

  return '<h1>Tu contraseña ha sido actualizada.</h1><a href = "http://localhost:5173/login" > Puedes volver a ingresar.</a > ';
};

module.exports = {
  chargeDbUsers,
  postUser,
  getAllUser,
  getByName,
  findId,
  updateUser,
  deleteUser,
  findBymail,
  modifyUserRole,
  changePasswordByToken,
};
