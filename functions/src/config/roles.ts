const allRoles = {
  user: ['getGames', 'updateGames','logged'],
  admin: ['getGames', 'updateGames','logged'],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

export {
  roles,
  roleRights,
};