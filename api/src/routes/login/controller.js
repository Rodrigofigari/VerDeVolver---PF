const { User, Role } = require('../../db.js');

const findUser = async (mail) => {
  if(!mail) throw Error('Debes ingresar un mail'); 

  const usuario = await User.findOne({
      where: { mail },
      include: [
        {
          model: Role,
          attributes: ['name'],
        },
      ],
  });
  
  if(!usuario) throw Error('No se encontraron usuarios con ese mail'); 

  return usuario;
};

module.exports = {
  findUser,
};
