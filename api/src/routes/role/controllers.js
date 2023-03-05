const { Role } = require('../../db.js');

async function chargeDbRoles() {
  const bulkCreateRoles = await Role.bulkCreate([
    { name: 'User' },
    { name: 'Admin' },
  ]);

  return bulkCreateRoles;
}

const createRole = async (role) => {
  if (!role) throw Error('Debes ingresar un rol'); 

  const newRole = await Role.create({
    name: role,
  });
  return newRole;
};

const deleteRole = async (name) => {
  if (!name) throw Error('Debes ingresar un nombre'); 

  const roleDelete = await Role.destroy({
    where: { name: name },
  });
  return roleDelete;
};

const getAll = async () => {
  const result = await Role.findAll();
  const roles = result.map((r) => r.name);
  return roles;
};

module.exports = {
  chargeDbRoles,
  createRole,
  deleteRole,
  getAll,
};
