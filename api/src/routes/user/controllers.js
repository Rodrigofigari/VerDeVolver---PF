const { Op } = require('sequelize');
const { Role, User, VdV } = require('../../db.js');
const { verify } = require('jsonwebtoken');
const {
  updatePassword,
} = require('../../services/email/templates/templateUsers');

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

const checkMail = async (mail) => {
  if (!mail) throw Error ('Debes ingresar un mail'); 
  
  const userMail = await User.findOne({
    where: { mail },
  });

  const vdvMail = await VdV.findOne({
    where: { mail },
  }); 

  if ( vdvMail || userMail){
    return false ; 
  } 

  return true ; 
};

const postUser = async (body) => {
  const { name, last_name, mail, password, image } = body;

  const check = await checkMail(mail); 
  if (check == false) throw Error('El mail ingresado ya pertenece a una cuenta'); 

  if (!name || !last_name|| !mail || !password)
    throw Error('Debes completar todos los campos obligatorios');

  const role = await Role.findByPk(1);
  
  const existUser = await User.findOne({
    where: {
      mail: {
        [Op.like]: body.mail,
      },
    },
  });

  if (existUser) throw Error(`El usuario con mail ${body.mail}, ya existe`); 
  else{  
    const newUser = await User.create({
      name: body.name,
      last_name: body.last_name,
      mail: body.mail,
      password: body.password,
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

  if (!dbAll) throw Error('No fue posible encontrar ningun usuario en la base de datos');

  return dbAll;
};

const getByName = async (name) => {
  if (!name) throw Error('Debes ingresar un nombre'); 

  const byName = await User.findAll({
    where: {
      name: {
        [Op.iLike]: `%${name}%`,
      },
    },
    include: [
      {
        model: Role,
        attributes: ['name'],
      },
    ],
  });

  if (!byName) throw Error(`No fue posible encontrar usuarios con el nombre ${name}`)

  return byName;
};

const findId = async (id) => {
  if (!id) throw Error ('Debes ingresar un id'); 

  const byPk = await User.findByPk(id, {
    include: [
      {
        model: Role,
        attributes: ['name'],
      },
    ],
  });

  if (!byPk) throw Error (`No fue posible encontrar un usuario con id ${id}`)

  return byPk;
};

const updateUser = async (userToUD, id) => {
  if (!id) throw Error('Debes ingresar un id');

  await User.update(userToUD, {
    where: { id },
  });
};

const modifyUserRole = async (id) => {
  try {
    if (!id) throw Error('Debes ingresar un id'); 
    //3 es owner
    await User.update({ RoleId: 3 }, { where: { id } });

    const userModified = await findId(id);
    return userModified;
  } catch (error) {
    throw Error({ error: error.message });
  }
};

const deleteUser = async (id) => {
  try {
    if (!id) throw Error('Debes ingresar un id');

    const findById = await User.findAll({
      where: { id },
    });

    if (!findById) throw Error(`El usuario con id ${id} no fue encontrado`);

    await User.destroy({
      where: { id },
    });
  } catch (error) {
    throw Error({ error: error.message });
  }
};

const findBymail = async (mail) => {
  if (!mail) throw Error ('Debes ingresar un mail'); 
  
  const userMail = User.findOne({
    where: { mail },
  });

  if (!userMail) throw Error(`El usuario con mail ${mail} no fue encontrado`);

  return userMail;
};

const changePasswordByToken = async (token, password) => {
  const { email } = verify(token, process.env.SECRET);

  const userUpdate = await findBymail(email);

  if (!userUpdate) throw Error(`El usuario con mail ${email} no fue encontrado`); 

  userUpdate.password = password;
  await userUpdate.save();

  return updatePassword;
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
