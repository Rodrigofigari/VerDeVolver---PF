// aca logica
const { Role } = require('../../db.js');

async function chargeDbRoles() {
  const bulkCreateRoles = await Role.bulkCreate([
    { name: 'User' },
    { name: 'Admin' },
  ]);

  return bulkCreateRoles;
}

const createRole = async (role) => {
  const newRole = await Role.create({
    name: role,
  });
  return newRole;
};

const deleteRole = async (name) => {
  const roleDelete = await Role.destroy({
    where: { name: name },
  });
  return roleDelete;
};

module.exports = {
  chargeDbRoles,
  createRole,
  deleteRole,
};
