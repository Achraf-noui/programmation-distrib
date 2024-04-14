const allRoles = {
  user: ['order_auth', 'reviews_rating_auth'],
  establishment_owner: ['manageEstablishment', 'create_establishment', 'bag_auth'],
  admin: ['getUsers', 'manageUsers'],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
