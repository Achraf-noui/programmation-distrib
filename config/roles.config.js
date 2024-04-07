const allRoles = {
  user: [],
  establishment_owner: ['manageEstablishment', 'create_establishment'],
  admin: ['getUsers', 'manageUsers'],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
